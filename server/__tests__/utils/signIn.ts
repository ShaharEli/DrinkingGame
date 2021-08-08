import request from 'supertest';
import User from '../../src/db/schemas/user';
import RefreshToken from '../../src/db/schemas/refreshToken';
import { usersToRegisterMock } from '../mocks';
import server from '../../src/app';

require('dotenv').config();

const AUTH_URL = '/auth/login';

export const handleSignIn = async () => {
  await User.deleteMany({});
  await RefreshToken.deleteMany({});
  await User.insertMany(usersToRegisterMock);
  try {
    return await request(server).post(AUTH_URL).send(usersToRegisterMock[0]);
  } catch (e) {
    return e;
  }
};
