import { Router } from 'express';
import { check, getUserById, signup, signin, } from '../controllers/user.controller';
import { body } from 'express-validator';
import { auth } from '../../../shared/auth/';
import { validateRequest } from '../../../shared/helpers/validateRequest';

const router = Router();

router.route('/check').get(auth,check);
router.route('/:id').get(getUserById);
router
  .route('/signup')
  .post(
    body('email').isEmail().withMessage('Ingrese un email valido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contrasena debe contener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('Su nombre no puede estar vacio'),
    validateRequest,
    signup
  );
router
  .route('/singin')
  .post(
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    validateRequest,
    signin
  );

export default router;
