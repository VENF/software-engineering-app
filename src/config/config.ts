//config Environment
interface IConfig {
  MONGODB_URI: string;
}
let URI: string;
process.env.NODE_ENV != 'pro'
  ? (URI = process.env.MONGODB_URI_DEV || 'mongodb+srv://venff:7JxnT3TXjrzdbllw@cluster0.t1pb2.mongodb.net/?retryWrites=true&w=majority')
  : (URI = process.env.MONGODB_URI_PRO || '');

export const config: IConfig = {
  MONGODB_URI: URI
};
