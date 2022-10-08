import { Router } from 'express';
import { getCard, cardRecharge, buy } from '../controllers/card.controller';
import { body } from 'express-validator';
import { auth } from '../../../shared/auth/';
import { validateRequest } from '../../../shared/helpers/validateRequest';

const router = Router();

router.route('/user').get(auth, getCard);
router
  .route('/recharge')
  .post(
    body('amount').isNumeric().withMessage('Debes recargar un monto mayor a 0'),
    auth,
    validateRequest,
    cardRecharge
  );
router.route('/buy').post(
  body('products').isArray().isLength({
    min: 1
  }),
  auth,
  validateRequest,
  buy
);

export default router;
