import { Document, Schema, model } from 'mongoose';

type UserEntity = Document & TUser;

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, minlength: 6 },
  mangas: { type: Array, default: [] },
  avatar: { type: String, default: 'defualt' },
});

export default model<UserEntity>('user', userSchema);

