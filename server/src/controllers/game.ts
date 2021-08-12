import { Request, Response } from 'express';
import Game from '../db/schemas/game';
import GameImg from '../db/schemas/gameImg';
import { IUser, Maybe } from '../types';
import { createError, friendsFields, getSocketList } from '../utils';

const getFormattedParticipants = (participants: Maybe<Partial<IUser>>[]) =>
  participants
    .map((participant: Maybe<Partial<IUser>>) =>
      participant?._id ? participant?._id : null
    )
    .filter((p: Maybe<string>) => !!p);

export const createGame = async (req: Request, res: Response) => {
  const { type = 'local', participants = [] } = req.body;
  if (!['local', 'online'].includes(type))
    return createError('invalid game type', 400);
  const formattedParticipants = getFormattedParticipants(participants);

  const gameToCreate = {
    participants: formattedParticipants,
    type,
    creator: req.userId!,
  };
  const newGame = (await new Game(gameToCreate).save()).populate({
    path: 'participants',
    select: friendsFields,
  });
  const io = req.app.get('socketio');
  io.to(getSocketList(participants, req.userId!)).emit('newGame', newGame);
  res.json(newGame);
};

export const addParticipantsToGame = async (req: Request, res: Response) => {
  const { participants, gameId } = req.body;
  const formattedParticipants = getFormattedParticipants(participants);

  if (!gameId || !formattedParticipants.length)
    return createError('invalid data', 400);
  const updatedGame = await Game.findByIdAndUpdate(
    gameId,
    {
      $addToSet: { participants: { $each: formattedParticipants } },
    },
    { new: true }
  ).populate({ path: 'participants', select: friendsFields });
  if (!updatedGame) return createError('invalid id', 400);
  const io = req.app.get('socketio');
  io.to(getSocketList(participants, req.userId!)).emit('newGame', updatedGame);
  res.json(updatedGame);
};

export const removeParticipantsFromGame = async (
  req: Request,
  res: Response
) => {
  const { participants, gameId } = req.body;
  const formattedParticipants = getFormattedParticipants(participants);

  if (!gameId || !formattedParticipants.length)
    return createError('invalid data', 400);
  const updatedGame = await Game.findByIdAndUpdate(
    gameId,
    {
      $pull: { participants: { $each: formattedParticipants } },
    },
    { new: true }
  ).populate({ path: 'participants', select: friendsFields });
  if (!updatedGame) return createError('invalid id', 400);
  res.json(updatedGame);
};

export const uploadGameImg = async (req: Request, res: Response) => {
  const { dareId, gameId, img, tagged = [] } = req.body;

  if (!dareId || !gameId || !img) return createError('invalid data', 400);
  const newImg = await new GameImg({
    dareId,
    gameId,
    img,
    tagged,
  }).save();

  const leanImg = newImg.toJSON();

  await Game.findByIdAndUpdate(
    gameId,
    {
      $addToSet: { imgs: leanImg._id },
    },
    { new: true }
  );

  const io = req.app.get('socketio');

  io.emit('gameImgAdded', leanImg);
  res.json({ added: true });
};
