import { Router } from 'express';
import { withTryCatch } from '../../utils';
import { checkToken } from '../../middelwares';
import {
  searchFriends,
  approveFriendRequest,
  declineFriendRequest,
  addFriend,
} from '../../controllers/friends';

require('dotenv').config();

const friendsRouter = Router();
friendsRouter.post('/search', checkToken, (req, res) =>
  withTryCatch(req, res, searchFriends)
);
friendsRouter.post('/new-friend-request', checkToken, (req, res) =>
  withTryCatch(req, res, addFriend)
);
friendsRouter.patch('/approve-friend-request', checkToken, (req, res) =>
  withTryCatch(req, res, approveFriendRequest)
);
friendsRouter.patch('/decline-friend-request', checkToken, (req, res) =>
  withTryCatch(req, res, declineFriendRequest)
);

export default friendsRouter;
