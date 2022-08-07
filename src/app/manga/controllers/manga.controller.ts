import { Request, Response } from 'express';
import Manga from '../model/manga.model';

export const getAll = async (_req: Request, res: Response) => {
  const mangas: Array<TManga> = await Manga.find({});
  return res.status(200).json(mangas);
};

export const searcher = async (req: Request, res: Response) => {
  const { title, category } = req.params;
  const regex = new RegExp(title, 'gi');
  let mangasFiltered: TManga[] = [];
  let mangas: TManga[] = [];
  title !== 'all'
    ? (mangas = await Manga.find({ title: regex }))
    : (mangas = await Manga.find({}));
  category
    ? (mangasFiltered = mangas.filter((manga) => manga.categories.includes(category)))
    : null;
  const data: TManga[] = category ? mangasFiltered : mangas;
  return res.status(200).json(data);
};
