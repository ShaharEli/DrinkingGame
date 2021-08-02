import {Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {
  IUser,
  LoginReturnType,
  PassAndEmail,
  Tokens,
  UserAndTokens,
} from '../types';
import {logger} from '../utils';
import {getItem, setItem} from '../utils';
import {publicFetch} from './publicFetch';
const BASE = '/auth';
const getRefreshOrThrow = async () => {
  const refreshToken = await getItem('refreshToken');
  if (!refreshToken) throw new Error('no refresh token found');
  return refreshToken;
};

export const logErrorToService = async (error: Error, info: string) => {
  try {
    let prevUser = await getItem('currUser');
    if (prevUser) {
      prevUser = JSON.parse(prevUser);
    }
    const payload = {
      platform: Platform.OS,
      error,
      info,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: prevUser ? prevUser._id : null,
    };
    const {created} = await publicFetch(`${BASE}/error`, 'POST', payload);
    return created;
  } catch {
    return false;
  }
};

export const getAccessToken = async () => {
  try {
    const refreshToken = await getRefreshOrThrow();
    const {accessToken} = await publicFetch<Pick<Tokens, 'accessToken'>>(
      `${BASE}/get-token`,
      'POST',
      {
        refreshToken,
      },
    );
    await setItem('accessToken', accessToken);
    return accessToken;
  } catch {}
};

export const loginByPass = async (payload: PassAndEmail): LoginReturnType => {
  try {
    const {user, accessToken, refreshToken} = await publicFetch<UserAndTokens>(
      `${BASE}/login`,
      'POST',
      payload,
    );
    await setItem('accessToken', accessToken);
    await setItem('refreshToken', refreshToken);
    await setItem('currUser', user);
    return user;
  } catch ({error}) {
    Snackbar.show({
      text: error,
      duration: Snackbar.LENGTH_SHORT,
    });
    logger.error(error); //TODO uncomment
    return null;
  }
};

export const register = async (payload: Partial<IUser>): LoginReturnType => {
  try {
    const {user, accessToken, refreshToken} = await publicFetch<UserAndTokens>(
      `${BASE}/register`,
      'POST',
      payload,
    );
    await setItem('accessToken', accessToken);
    await setItem('refreshToken', refreshToken);
    await setItem('currUser', user);
    return user;
  } catch (e) {
    Snackbar.show({
      text: e.error,
      duration: Snackbar.LENGTH_SHORT,
    });
    logger.error(e);
    return null;
  }
};

export const loginWithToken = async (): LoginReturnType => {
  try {
    const refreshToken = await getRefreshOrThrow();
    const {accessToken, user} = await publicFetch<
      Pick<UserAndTokens, 'user' | 'accessToken'>
    >(`${BASE}/login-with-token`, 'POST', {refreshToken});
    await setItem('accessToken', accessToken);
    await setItem('currUser', user);
    return user;
  } catch ({message}) {
    // logger.error(message); //TODO uncomment
    return null;
  }
};
