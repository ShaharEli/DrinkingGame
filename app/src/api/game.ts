import {Maybe} from '../types';
import {
  IGame,
  IGameImgPayload,
  IGamePayload,
  IParticipantsPayload,
} from '../types/game';
import {logger} from '../utils';
import securedFetch from './privateFetch';
const BASE = '/game';

export const createGame = async ({
  type,
  participants,
}: IGamePayload): Promise<Maybe<IGame>> => {
  try {
    const game = await securedFetch<IGame>(`${BASE}/new`, 'POST', {
      participants,
      type,
    });
    return game;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const addParticipantsToGame = async ({
  participants,
  gameId,
}: IParticipantsPayload): Promise<Maybe<IGame>> => {
  try {
    const game = await securedFetch<IGame>(`${BASE}/participants`, 'POST', {
      participants,
      gameId,
    });
    return game;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const removeParticipantsFromGame = async ({
  participants,
  gameId,
}: IParticipantsPayload): Promise<Maybe<IGame>> => {
  try {
    const game = await securedFetch<IGame>(`${BASE}/participants`, 'DELETE', {
      participants,
      gameId,
    });
    return game;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const addImgToDare = async ({
  gameId,
  dareId,
  img,
  tagged,
}: IGameImgPayload): Promise<Maybe<IGame>> => {
  try {
    const game = await securedFetch<IGame>(`${BASE}/upload-img`, 'POST', {
      gameId,
      dareId,
      img,
      tagged,
    });
    return game;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const fetchGame = async ({
  _id,
}: Pick<IGame, '_id'>): Promise<Maybe<IGame>> => {
  try {
    const game = await securedFetch<IGame>(`${BASE}?id=${_id}`);
    return game;
  } catch (err) {
    logger.error(err);
    return null;
  }
};
