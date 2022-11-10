import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_KEY || 'dsh23sd8h32332@$@dsjjsza13';

export const createToken = (id: string) =>
  jwt.sign({ _id: id }, secretKey, {
    expiresIn: 60 * 60 * 24
  });
