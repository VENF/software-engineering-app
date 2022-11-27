import { Request, Response } from 'express';
import Card from '../model/card.model';
import Manga from '../../manga/model/manga.model';
import User from '../../user/model/user.model';
import Shopping from '../../shopping/model/shopping.model';

export const getCard = async (req: Request, res: Response) => {
  const card = await Card.find({ userId: req.userId });
  return res.status(200).json(card);
};

export const cardRecharge = async (req: Request, res: Response) => {
  const { amount } = req.body;
  if (amount < 1)
    return res.status(400).json({
      msg: 'Debes ingresar un monto mayor a 0'
    });
  const credit: any = await Card.findOne({
    userId: req.userId
  });
  const card: TCard = credit;
  const updateCard = await Card.findOneAndUpdate(
    {
      userId: req.userId
    },
    {
      $push: {
        rechargesList: {
          amount: amount,
          date: new Date()
        }
      },
      amount: parseFloat(card.amount + amount)
    },
    {
      new: true
    }
  );
  return res.status(200).json({
    msg: 'Recarga exitosa',
    update: updateCard
  });
};

export const buy = async (req: Request, res: Response) => {
  const { products } = req.body;

  let total: number = 0;

  const indexed = (arr: Array<any>, key: any) =>
    arr.reduce((acc: Array<any>, el: any) => {
      acc[el[key]] = el;
      return acc;
    }, {});

  const allmangas: any = await Manga.find({});
  const findUser: any = await User.findById(req.userId);
  const credit: any = await Card.findOne({ userId: req.userId });

  const mangas: TManga[] = allmangas;
  const card: TCard = credit;

  const mangasIndexed = indexed(mangas, '_id');
  const mangasToBuy = products.map((id: string) => mangasIndexed[id]);

  mangasToBuy.forEach((manga: TManga) => {
    total += manga.price;
  });
  if (card.amount < parseFloat(total.toFixed(2)))
    return res.status(200).json({
      msg: 'Saldo insuficiente'
    });
  await credit.update({
    amount: card.amount - parseFloat(total.toFixed(2)),
    $push: {
      expensesList: {
        amount: parseFloat(total.toFixed(2)),
        date: new Date()
      }
    }
  });
  const addedMangas = findUser.mangas.concat(mangasToBuy)
  await findUser.update({
    mangas: addedMangas
  });
  await Shopping.findOneAndUpdate(
    {
      userId: req.userId
    },
    {
      products: []
    }
  );
  return res.status(200).json({
    msg: 'Compra exitosa ! Ahora puedes disfrutar de tu lectura'
  });
};
