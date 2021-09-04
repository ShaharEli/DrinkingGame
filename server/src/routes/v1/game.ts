import { Router } from 'express';
import {
  uploadGameImg,
  removeParticipantsFromGame,
  addParticipantsToGame,
  createGame,
  getGame,
} from '../../controllers';
import { withTryCatch } from '../../utils';
import { checkToken } from '../../middelwares';

require('dotenv').config();

const gameRouter = Router();
gameRouter.use(checkToken);

gameRouter.post('/new', (req, res) => withTryCatch(req, res, createGame));
gameRouter.get('/', (req, res) => withTryCatch(req, res, getGame));
gameRouter.post('/participants', (req, res) =>
  withTryCatch(req, res, addParticipantsToGame)
);
gameRouter.post('/upload-img', (req, res) =>
  withTryCatch(req, res, uploadGameImg)
);
gameRouter.delete('/participants', (req, res) =>
  withTryCatch(req, res, removeParticipantsFromGame)
);

export default gameRouter;
