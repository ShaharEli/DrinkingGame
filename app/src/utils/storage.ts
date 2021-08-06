import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Lang, Theme} from '../types';
import {DEFAULT_LANG, DEFAULT_THEME} from './consts';
import {logger} from './logger';

export async function getAppLanguage(): Promise<Lang> {
  try {
    const value = (await AsyncStorage.getItem('language')) as Lang | null;
    if (value) {
      return value;
    }
    return DEFAULT_LANG;
  } catch (error) {
    return DEFAULT_LANG;
  }
}

export const setUserTheme = async (theme: Theme): Promise<boolean> => {
  try {
    await setItem('theme', theme);
    return true;
  } catch ({message}) {
    return false;
  }
};
export const getUserTheme = async (): Promise<Theme> => {
  try {
    const value = (await AsyncStorage.getItem('theme')) as Theme | null;
    if (value) {
      return value;
    }
    return DEFAULT_THEME;
  } catch ({message}) {
    return DEFAULT_THEME;
  }
};
export async function setAppLanguage(lang: Lang): Promise<Lang> {
  moment.locale(lang);
  try {
    await AsyncStorage.setItem('language', lang);
  } catch ({message}) {
    logger.error(message);
  }
  return lang;
}

export const setItemWithExpiry = async (
  key: string,
  value: string,
  ttl = 604800000,
): Promise<void> => {
  // expiry default value - week in ms
  const item = {
    value,
    expiry: Date.now() + ttl,
  };
  return await AsyncStorage.setItem(key, JSON.stringify(item));
};

export const getItem = async (k: string) => {
  try {
    return await AsyncStorage.getItem(k);
  } catch {
    return null;
  }
};

export const setItem = async (k: string, v: any) => {
  try {
    return await AsyncStorage.setItem(
      k,
      typeof v === 'object' ? JSON.stringify(v) : v,
    );
  } catch {
    return null;
  }
};
