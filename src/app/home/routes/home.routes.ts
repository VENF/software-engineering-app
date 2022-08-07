import { Router } from 'express';
import { home } from '../controllers/home.controller';
import { auth } from '../../../shared/auth/';

const router = Router();

router.route('/dashboard').get(auth,home);

export default router;
