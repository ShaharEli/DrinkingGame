import {Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {IUser} from '../types';
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
  const refreshToken = await getRefreshOrThrow();
  const {accessToken} = await publicFetch(`${BASE}/get-token`, 'POST', {
    refreshToken,
  });
  await setItem('accessToken', accessToken);
  return accessToken;
};

export const loginByPass = async (phone: string, password: string) => {
  try {
    const {user, accessToken, refreshToken} = await publicFetch(
      `${BASE}/login`,
      'POST',
      {phone, password},
    );
    await setItem('accessToken', accessToken);
    await setItem('refreshToken', refreshToken);
    await setItem('currUser', user);
    const privateKey = await getItem(`privateKey@${user._id}`);
    return {...user, privateKey};
  } catch ({error}) {
    Snackbar.show({
      text: error,
      duration: Snackbar.LENGTH_SHORT,
    });
    logger.error(error); //TODO uncomment
    return false;
  }
};

export const register = async (payload: Partial<IUser>) => {
  try {
    const {user, accessToken, refreshToken} = await publicFetch(
      `${BASE}/register`,
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
    logger.error(error);
    return false;
  }
};

export const loginWithToken = async () => {
  try {
    const refreshToken = await getRefreshOrThrow();
    const {accessToken, user} = await publicFetch(
      `${BASE}/login-with-token`,
      'POST',
      {refreshToken},
    );
    await setItem('accessToken', accessToken);
    await setItem('currUser', user);
    return user;
  } catch ({message}) {
    logger.error(message); //TODO uncomment
    return false;
  }
};
