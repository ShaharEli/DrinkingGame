import { Router } from 'express';
import { checkToken } from '../../middelwares';
import friendsRouter from './friends';
import authRouter from './auth';
import dareRouter from './dare';
import gameRouter from './game';

const router = Router();

router.use('/auth', authRouter);
router.use(checkToken);
router.use('/friends', friendsRouter);
router.use('/dares', dareRouter);
router.use('/game', gameRouter);

export default router;
