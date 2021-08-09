import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks';
import {
  addFriendAction,
  approveFriendRequestAction,
  declineFriendRequestAction,
} from '../redux/slices';
import {fontS} from '../styles/themes/general';
import {FriendRequestsStatusEnum} from '../utils';
import MainBtn, {Props as MainBtnProps} from './MainBtn';
interface Props {
  id: string;
}
const FriendRequestHandler = ({id: _id}: Props) => {
  const {user, loadingAuth} = useAppSelector(state => state.user);
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
    let curr = user.friendRequests?.find(
      ({to, from, status}) =>
        (to === _id || from === _id) &&
        status === FriendRequestsStatusEnum.PENDING,
    );

    if (!curr) {
      curr = user.friendRequests?.find(
        ({to, from}) => to === _id || from === _id,
      );
    }
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
        cb: () =>
          dispatch(
            approveFriendRequestAction({
              friendUserId: _id,
              friendRequestId: curr!._id,
            }),
          ),
        cb2: () => dispatch(declineFriendRequestAction(curr!._id)),
      };
    }
    return {
      label: t('addFriend'),
      cb: () => dispatch(addFriendAction(_id)),
    };
  }, [user, _id, dispatch, t]);

  if (!friendRequestMeta.cb) {
    return <StyledBtn disabled={true}>{friendRequestMeta.label}</StyledBtn>;
  }

  if (friendRequestMeta.label2 && friendRequestMeta.cb2) {
    return (
      <View>
        <StyledBtn disabled={loadingAuth} onPress={friendRequestMeta.cb}>
          {friendRequestMeta.label}
        </StyledBtn>
        <StyledBtn
          isNegative
          disabled={loadingAuth}
          onPress={friendRequestMeta.cb2}>
          {friendRequestMeta.label2}
        </StyledBtn>
      </View>
    );
  }

  return (
    <StyledBtn disabled={loadingAuth} onPress={friendRequestMeta.cb}>
      {friendRequestMeta.label}
    </StyledBtn>
  );
};

export default FriendRequestHandler;

const StyledBtn = ({
  disabled,
  onPress,
  children,
  isNegative,
}: MainBtnProps & {isNegative?: boolean}) => {
  const {colors} = useAppSelector(state => state.styles);

  return (
    <MainBtn
      {...{disabled, onPress}}
      style={{
        ...styles.btn,
        ...{backgroundColor: isNegative ? colors.RED : colors.GREEN_PRIMARY},
      }}
      textStyle={{...fontS(10), ...styles.textCenter}}>
      {children}
    </MainBtn>
  );
};

const styles = StyleSheet.create({
  btn: {borderRadius: 10, height: 30, width: 40, marginVertical: 2},
  textCenter: {textAlign: 'center'},
});
