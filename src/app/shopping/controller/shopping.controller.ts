import { Request, Response } from 'express';
import Manga from '../../manga/model/manga.model';
import Shopping from '../model/shopping.model';

export const getProducts = async (req: Request, res: Response) => {
  const list: TShoppingCar | null = await Shopping.findOne({
    userId: req.userId
  });
  return res.status(200).json(list);
};

export const addProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  try {
    const product: any = await Manga.findById(productId);
    const shopping: any = await Shopping.findOne({
      userId: req.userId
    });
    const manga: TManga = product;
    const cart: TShoppingCar = shopping;
    const duplicate = cart.products.filter((item: any) => manga.title === item.title);

    if (duplicate.length > 0) {
      return res.status(200).json({
        msg: 'Este Manga ya se encuentra en su lista de compras'
      });
    }

    const addedManga = await Shopping.findOneAndUpdate(
      {
        userId: req.userId
      },
      {
        $push: {
          products: manga
        }
      },
      {
        new: true
      }
    );

    return res.status(200).json({
      msg: 'Producto agregado con exito',
      updated: addedManga?.products
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  try {
    const shopping: any = await Shopping.findOne({
      userId: req.userId
    });
    const cart: TShoppingCar = shopping;
    const products = cart.products.filter(
      (item: any) => item._id.toString() !== productId
    );
    const update = await Shopping.findOneAndUpdate(
      {
        userId: req.userId
      },
      {
        products: products
      },
      {
        new: true
      }
    );
    return res.status(200).json({
      msg: 'Producto eliminado con exito',
      updated: update
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};
