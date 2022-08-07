import Manga from '../../app/manga/model/manga.model';

/* Mangas */
import { snk, jjk, hxh, tokyoghoul, deadmanwonderland, deathnote } from './mangas';
/* Mangas */

export const insertDataMangas = async () => {
  try {
    await Manga.deleteMany({});
    await Manga.insertMany([snk, jjk, hxh, tokyoghoul, deadmanwonderland, deathnote]);
  } catch (error) {
    throw new Error('Error');
  }
};
