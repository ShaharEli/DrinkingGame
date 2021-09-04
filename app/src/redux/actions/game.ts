import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  IGame,
  IGamePayload,
  IParticipantsPayload,
  Maybe,
  IGameImgPayload,
} from '../../types';
import {
  createGame,
  addParticipantsToGame,
  removeParticipantsFromGame,
  addImgToDare,
  fetchGame,
} from '../../api';

export const createGameAction = createAsyncThunk<Maybe<IGame>, IGamePayload>(
  'game/createGameAction',
  async payload => await createGame(payload),
);

export const addParticipantsToGameAction = createAsyncThunk<
  Maybe<IGame>,
  IParticipantsPayload
>(
  'game/addParticipantsToGameAction',
  async payload => await addParticipantsToGame(payload),
);

export const removeParticipantsFromGameAction = createAsyncThunk<
  Maybe<IGame>,
  IParticipantsPayload
>(
  'game/removeParticipantsFromGameAction',
  async payload => await removeParticipantsFromGame(payload),
);

export const addImgToDareAction = createAsyncThunk<
  Maybe<IGame>,
  IGameImgPayload
>('game/addImgToDareAction', async payload => await addImgToDare(payload));

export const fetchGameAction = createAsyncThunk<
  Maybe<IGame>,
  Pick<IGame, '_id'>
>('game/fetchGameAction', async payload => await fetchGame(payload));
