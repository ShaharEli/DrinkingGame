import Snackbar from 'react-native-snackbar';
import {IFriend, IFriendRequest, IUser, Maybe} from '../types';
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

export const addFriend = async (
  friendUserId: string,
): Promise<Maybe<IFriendRequest>> => {
  try {
    return await securedFetch<IFriendRequest>(
      `${BASE}/new-friend-request`,
      'POST',
      {
        friendUserId,
      },
    );
  } catch (err) {
    logger.error(err);
    Snackbar.show({
      text: i18n.t('addFriendError'),
      duration: Snackbar.LENGTH_SHORT,
    });
    return null;
  }
};

export const approveFriendRequest = async (
  friendUserId: string,
): Promise<Maybe<IUser>> => {
  try {
    return await securedFetch<IUser>(
      `${BASE}/approve-friend-request`,
      'PATCH',
      {
        friendUserId,
      },
    );
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const declineFriend = async (
  friendUserId: string,
): Promise<Maybe<IFriendRequest>> => {
  try {
    return await securedFetch<IFriendRequest>(
      `${BASE}/new-friend-request`,
      'PATCH',
      {
        friendUserId,
      },
    );
  } catch (err) {
    logger.error(err);
    return null;
  }
};
