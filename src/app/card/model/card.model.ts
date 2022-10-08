import { Document, model, Schema } from 'mongoose';

type CardEntity = Document & TCard;

const cardSchema = new Schema({
  userId: { type: String },
  amount: { type: Number, default: 0 },
  rechargesList: { type: Array, default: [] },
  expensesList: { type: Array, default: [] }
});

export default model<CardEntity>('card', cardSchema)