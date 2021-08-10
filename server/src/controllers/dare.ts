import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Dare from '../db/schemas/dare';
import { createError } from '../utils';

export const fetchDare = async (req: Request, res: Response) => {
  const { alreadyFetched = [], language } = req.body;
  if (!language) return createError('language missing', 500);
  const formattedAlreadyFetched = alreadyFetched.filter(
    (x: any) => typeof x === 'string'
  );
  const randomDare = await Dare.aggregate([
    {
      $match: {
        _id: {
          $nin: formattedAlreadyFetched.map((id: string) =>
            mongoose.Types.ObjectId(id)
          ),
        },
        language,
      },
    },
    { $sample: { size: 1 } },
  ]);

  if (!randomDare?.length) return createError('out of dares', 402); // TODO change status
  res.json(randomDare[0]);
};
