import { Router } from 'express';
import { checkToken } from '../../middelwares';
import friendsRouter from './friends';
import authRouter from './auth';
import dareRouter from './dare';

const router = Router();

router.use('/auth', authRouter);
router.use(checkToken);
router.use('/friends', friendsRouter);
router.use('/dares', dareRouter);

export default router;
