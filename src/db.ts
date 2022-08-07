import mongoose, { ConnectionOptions } from 'mongoose';
import { config } from './config/config';

const options: ConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

if (process.env.NODE_ENV === 'dev') {
  mongoose.connect(config.MONGODB_URI, options);
  const connection = mongoose.connection;
  connection.once('open', (_) => {
    console.log('db is connected');
  });
  connection.on('error', (err) => {
    console.log(err);
    process.exit(0);
  });
} else {
  mongoose.connect(config.MONGODB_URI, options);
  const connection = mongoose.connection;
}
