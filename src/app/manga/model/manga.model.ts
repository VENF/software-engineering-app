import { Document, model, Schema } from 'mongoose';

type MangaEntity = Document & TManga;

const mangaSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  rating: { type: Number, default: 0 },
  votes: { type: String, required: true },
  sinopsis: { type: String, required: true },
  price: { type: Number, required: true },
  categories: { type: Array, default: [] },
  url: { type: String, default: "" }
});

export default model<MangaEntity>('manga', mangaSchema);
