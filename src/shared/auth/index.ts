import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token)
    return res.status(401).json({
      msg: 'acceso denegado'
    });
  const payload = jwt.verify(token, process.env.JWT_KEY || '') as IPayload;
  req.userId = payload._id
  next();
};
