import { Router } from 'express';
import { withTryCatch } from '../../utils';
import {
  searchFriends,
  approveFriendRequest,
  declineFriendRequest,
  addFriend,
  searchFromArr,
} from '../../controllers/friends';

require('dotenv').config();

const friendsRouter = Router();

friendsRouter.post('/search', (req, res) =>
  withTryCatch(req, res, searchFriends)
);
friendsRouter.post('/new-friend-request', (req, res) =>
  withTryCatch(req, res, addFriend)
);
friendsRouter.patch('/approve-friend-request', (req, res) =>
  withTryCatch(req, res, approveFriendRequest)
);
friendsRouter.patch('/decline-friend-request', (req, res) =>
  withTryCatch(req, res, declineFriendRequest)
);

friendsRouter.post('/search-from-arr', (req, res) =>
  withTryCatch(req, res, searchFromArr)
);

export default friendsRouter;
