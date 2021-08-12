import { Router } from 'express';
import { withTryCatch } from '../../utils';
import { fetchDare } from '../../controllers';
import { checkToken } from '../../middelwares';

require('dotenv').config();

const dareRouter = Router();
dareRouter.use(checkToken);

dareRouter.post('/fetch', (req, res) => withTryCatch(req, res, fetchDare));

export default dareRouter;
