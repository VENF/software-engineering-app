import express, { Application } from 'express';
// Routes
import userRoutes from './app/user/routes/user.routes';
import dasboardRoutes from './app/home/routes/home.routes';
import mangaRoutes from './app/manga/routes/manga.routes';
import ShoppingRoutes from './app/shopping/routes/shopping.routes';
// fill db before starter
import { insertDataMangas } from './config/data';
// helpers
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

export class Server implements IServer {
  private server: Application;

  constructor(private port?: number | string) {
    this.server = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.server.set('port', process.env.PORT || this.port);
  }
  middlewares() {
    const corsOptions = { origin: 'http://localhost:3000', optionsSuccessStatus: 200 };
    this.server.use(cors(corsOptions));
    this.server.use(morgan('dev'));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(express.static(path.resolve(__dirname, 'public')));
  }
  routes() {
    this.server.use('/user', userRoutes);
    this.server.use('/home', dasboardRoutes);
    this.server.use('/manga', mangaRoutes);
    this.server.use('/cart', ShoppingRoutes);
  }
  async listen() {
    this.server.listen(this.server.get('port'));
    if (process.env.NODE_ENV != 'pro') {
      // await insertDataMangas();
      console.log('server listen on port', this.server.get('port'));
    }
  }
}
