import User from '../model/user.model';
import Shopping from '../../shopping/model/shopping.model';
import { encryptPassword, comparePassword } from '../../../shared/services/bcrypt';
import { createToken } from '../../../shared/services/jwt';
import { Request, Response } from 'express';

export const check = async (req: Request, res: Response) => {
  const users = await User.findById(req.userId, {
    avatar: 1,
    email: 1,
    mangas: 1,
    name: 1
  });
  return res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  let response = {
    status: 0,
    msg: '',
    user: {}
  };
  const { id } = req.params;
  const user = await User.findById(id);
  !user
    ? (response = {
        status: 404,
        msg: 'Usuario no encontrado',
        user: {}
      })
    : (response = {
        status: 200,
        msg: 'Operacion exitosa',
        user: user
      });
  return res.status(response.status).json(response);
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const encrypted = await encryptPassword(password);
  const user = new User({
    email,
    password: encrypted,
    name
  });
  const userCar = new Shopping({
    userId: user._id,
    products: []
  });
  try {
    await user.save();
    await userCar.save();
    return res.status(200).json({
      msg: 'Usuario creado con exito',
      error: false
    });
  } catch (error) {
    const errorEvent: any = error;
    return res.status(400).json({
      errors: [
        {
          value: errorEvent.keyValue,
          field: errorEvent.keyPattern,
          code: errorEvent.code
        }
      ]
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: TUser | null = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({
        msg: 'Este usuario no existe'
      });
    const validatePassword = await comparePassword(password, user.password);
    if (!validatePassword)
      return res.status(400).json({
        msg: 'su contrasena es incorrecta'
      });
    const token = createToken(user._id);
    return res.header('auth-token', token).json({
      auth: true,
      user,
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
};

