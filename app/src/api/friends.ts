import Snackbar from 'react-native-snackbar';
import {IFriend, Maybe} from '../types';
import {logger} from '../utils';
import securedFetch from './privateFetch';
const BASE = '/friends';
import i18n from '../i18n';

export const searchFriends = async (
  friendUserName: string,
): Promise<IFriend[]> => {
  try {
    const friends = await securedFetch<IFriend[]>(`${BASE}/search`, 'POST', {
      friendUserName,
    });
    return friends;
  } catch (err) {
    logger.error(err);
    return [];
  }
};

export const addFriend = async (id: string): Promise<Maybe<IFriend>> => {
  try {
    return await securedFetch<IFriend>(`${BASE}/add`, 'POST', {id});
  } catch (err) {
    logger.error(err);
    Snackbar.show({
      text: i18n.t('addFriendError'),
      duration: Snackbar.LENGTH_SHORT,
    });
    return null;
  }
};
