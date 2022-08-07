//declaration all interfaces

// server
interface IServer {
  settings(): void;
  middlewares(): void;
  routes(): void;
  listen(): void;
}
// user
interface IUserRepository {
  findAll: () => Promise<Array<TUser | []>>;
  findById: (id: string) => Promise<TUser>;
  create: (user: TUser) => Promise<TUser>;
}

interface IUserServices {
  findAllUsers: () => Promise<Array<TUser | []>>;
  findUserById: (id: string) => Promise<TUser>;
  createUser: (user: TUser) => Promise<TUser>;
}

//auth-payload
interface IPayload {
  _id: string;
  iat: number;
  exp: number
}

declare namespace Express {
  interface Request {
    userId: string;
  }
}
