import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {
  ISuccess,
  IUser,
  LoginReturnType,
  PassAndEmail,
  Tokens,
  UserAndTokens,
} from '../types';
import {logger} from '../utils';
import {getItem, setItem} from '../utils';
import securedFetch from './privateFetch';
import {publicFetch} from './publicFetch';
const BASE = '/auth';
const getRefreshOrThrow = async () => {
  const refreshToken = await getItem('refreshToken');
  if (!refreshToken) throw new Error('no refresh token found');
  return refreshToken;
};

export const logErrorToService = async (error: Error, info: string) => {
  try {
    const prevUserString = await getItem('currUser');
    let prevUser;
    if (prevUserString) {
      prevUser = JSON.parse(prevUserString);
    }
    const payload = {
      platform: Platform.OS,
      error,
      info,
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
  } catch (e) {
    if (e?.error) {
      Snackbar.show({
        text: e.error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    logger.error(e); //TODO uncomment
    return null;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const {success} = await securedFetch<ISuccess>(`${BASE}/logout`, 'POST');
    if (success) {
      await AsyncStorage.multiRemove([
        'accessToken',
        'currProfile',
        'refreshToken',
      ]);
    }
    return success;
  } catch (e) {
    logger.error(e);
    return false;
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
    if (e?.error) {
      Snackbar.show({
        text: e.error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }

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

export const editUser = async (payload: Partial<IUser>): LoginReturnType => {
  try {
    const {user} = await securedFetch<Record<'user', IUser>>(
      `${BASE}/edit`,
      'PUT',
      payload,
    );
    return user;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

export const checkUserName = async (userName: string): Promise<boolean> => {
  try {
    const {ok} = await securedFetch<Record<'ok', boolean>>(
      `${BASE}/check-username`,
      'POST',
      {userName},
    );
    return ok;
  } catch ({message}) {
    logger.error(message);
    return false;
  }
};
