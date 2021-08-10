import { Router } from 'express';
import { withTryCatch } from '../../utils';
import { fetchDare } from '../../controllers';

require('dotenv').config();

const dareRouter = Router();

dareRouter.post('/fetch', (req, res) => withTryCatch(req, res, fetchDare));

export default dareRouter;
