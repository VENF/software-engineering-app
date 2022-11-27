import Manga from '../../app/manga/model/manga.model';

/* Mangas */
import data from './mangas';
/* Mangas */

export const insertDataMangas = async () => {
  try {
    await Manga.deleteMany({});
    await Manga.insertMany(data);
  } catch (error) {
    throw new Error('Error');
  }
};
