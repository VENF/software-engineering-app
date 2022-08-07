import { Router } from 'express';
import { getAll, searcher  } from '../controllers/manga.controller';
import { auth } from '../../../shared/auth/';

const router = Router();

router.route('/all').get(auth, getAll);
router.route('/:title/:category?').get(auth, searcher);

export default router;
