import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks';
import {
  addFriendAction,
  approveFriendRequestAction,
  declineFriendRequestAction,
} from '../redux/slices';
import {FriendRequestsStatusEnum} from '../utils';
import MainBtn from './MainBtn';
interface Props {
  id: string;
}
const FriendRequestHandler = ({id: _id}: Props) => {
  const {user, loadingAuth} = useAppSelector(state => state.user);
  //   const {rootStyles} = useAppSelector(state => state.styles);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const friendRequestMeta = useMemo(() => {
    const base = {
      label: '',
      label2: '',
      cb: null,
      cb2: null,
    };
    if (user.friends?.find(({_id: friendId}) => friendId === _id)) {
      return {...base, label: t('friends')};
    }
    const curr = user.friendRequests?.find(
      ({to, from}) => to === _id || from === _id,
    );
    if (!curr)
      return {
        ...base,
        label: t('addFriend'),
        cb: () => dispatch(addFriendAction(_id)),
      };
    if (curr.from === user._id) {
      if (curr.status === FriendRequestsStatusEnum.PENDING) {
        return {...base, label: t('sent')};
      } else {
        return {...base, label: t('declined')};
      }
    }
    if (curr.status === FriendRequestsStatusEnum.PENDING) {
      return {
        label: t('approve'),
        label2: t('decline'),
        cb: () => dispatch(approveFriendRequestAction(_id)),
        cb2: () => dispatch(declineFriendRequestAction(_id)),
      };
    }
    return {
      label: t('declined'),
    };
  }, [user, _id, dispatch, t]);

  if (!friendRequestMeta.cb) {
    return (
      <MainBtn style={styles.btn} disabled={true}>
        {friendRequestMeta.label}
      </MainBtn>
    );
  }

  if (friendRequestMeta.label2 && friendRequestMeta.cb2) {
    return (
      <View>
        <MainBtn
          style={styles.btn}
          disabled={loadingAuth}
          onPress={friendRequestMeta.cb}>
          {friendRequestMeta.label}
        </MainBtn>
        <MainBtn
          style={styles.btn}
          disabled={loadingAuth}
          onPress={friendRequestMeta.cb2}>
          {friendRequestMeta.label2}
        </MainBtn>
      </View>
    );
  }

  return (
    <MainBtn
      style={styles.btn}
      disabled={loadingAuth}
      onPress={friendRequestMeta.cb}>
      {friendRequestMeta.label}
    </MainBtn>
  );
};

export default FriendRequestHandler;

const styles = StyleSheet.create({
  btn: {borderRadius: 10, height: 40, width: 80},
});
