import { Document, model, Schema } from 'mongoose';

type ShoppingCarEntity = Document & TShoppingCar;

const shoppingCarSchema = new Schema({
  userId: { type: String, default: '' },
  products: { type: Array, default: [] }
});

export default model<ShoppingCarEntity>('shopping', shoppingCarSchema)