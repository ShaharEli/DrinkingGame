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
} from '../../api';

export const createGameAction = createAsyncThunk<Maybe<IGame>, IGamePayload>(
  'user/createGameAction',
  async payload => await createGame(payload),
);

export const addParticipantsToGameAction = createAsyncThunk<
  Maybe<IGame>,
  IParticipantsPayload
>(
  'user/addParticipantsToGameAction',
  async payload => await addParticipantsToGame(payload),
);

export const removeParticipantsFromGameAction = createAsyncThunk<
  Maybe<IGame>,
  IParticipantsPayload
>(
  'user/removeParticipantsFromGameAction',
  async payload => await removeParticipantsFromGame(payload),
);

export const addImgToDareAction = createAsyncThunk<
  Maybe<IGame>,
  IGameImgPayload
>('user/addImgToDareAction', async payload => await addImgToDare(payload));
