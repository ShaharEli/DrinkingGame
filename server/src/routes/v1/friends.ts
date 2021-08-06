import { Router } from 'express';
import { withTryCatch } from '../../utils';
import { checkToken } from '../../middelwares';
import { searchFriends } from '../../controllers/friends';

require('dotenv').config();

require('dotenv').config();

const friendsRouter = Router();
friendsRouter.post('/search', checkToken, (req, res) =>
  withTryCatch(req, res, searchFriends)
);

export default friendsRouter;
