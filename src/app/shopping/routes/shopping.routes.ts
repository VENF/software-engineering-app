import { Router } from 'express';
import {
  getProducts,
  addProduct,
  removeProduct
} from '../controller/shopping.controller';
import { body } from 'express-validator';
import { auth } from '../../../shared/auth/';
import { validateRequest } from '../../../shared/helpers/validateRequest';

const router = Router();

router.route('/products').get(auth, getProducts);
router
  .route('/remove')
  .put(
    body('productId').notEmpty().withMessage('Se necesita el id del producto'),
    validateRequest,
    auth,
    removeProduct
  );
router
  .route('/add')
  .put(
    body('productId').notEmpty().withMessage('Se necesita el id del producto'),
    validateRequest,
    auth,
    addProduct
  );

export default router;
