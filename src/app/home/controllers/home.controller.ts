import Manga from '../../manga/model/manga.model';
import { Request, Response } from 'express';

export const home = async (_req: Request, res: Response) => {
  const mangas: TManga[] = await Manga.find({});
  const morepopular: TManga[] = mangas.filter((manga: TManga) => manga.rating >= 4);
  const recomended: TManga[] = mangas.filter((manga: TManga) =>
    manga.categories.includes('shounen')
  );
  return res.status(200).json({
    popular: morepopular,
    recomended: recomended
  });
};
