import React from 'react';
// import {useTranslation} from 'react-i18next';
import {ImageStyle, TouchableOpacity, View} from 'react-native';
import {
  // useAppDispatch,
  useAppSelector,
} from '../hooks';
// import {
//   addFriendAction,
//   approveFriendRequestAction,
//   declineFriendRequestAction,
// } from '../redux/slices';
// import {FriendRequestsStatusEnum} from '../utils';
import Avatar from './Avatar';
import FriendRequestHandler from './FriendRequestHandler';
import Txt from './Txts/Txt';
interface Props {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
  lastConnected: Date;
  isActive: boolean;
  createdAt: Date;
  addOptionOn?: boolean;
}
const FriendListItem = ({
  _id,
  firstName,
  lastName,
  userName,
  avatar,
  // lastConnected,
  isActive,
  // createdAt,
  addOptionOn = false,
}: Props): JSX.Element => {
  // const {user, loadingAuth} = useAppSelector(state => state.user);
  const {rootStyles} = useAppSelector(state => state.styles);
  // const dispatch = useAppDispatch();
  // const {t} = useTranslation();

  return (
    <TouchableOpacity
      disabled={addOptionOn}
      style={[rootStyles.flexRow, rootStyles.alignCenter, rootStyles.mb4]}>
      <View style={[rootStyles.flexRow, rootStyles.alignCenter]}>
        <Avatar
          img={avatar}
          isActive={isActive}
          style={rootStyles.me3 as ImageStyle}
        />
        <Txt size={15}>{`${firstName} ${lastName}`}</Txt>
      </View>
      <Txt style={rootStyles.mx4} size={10}>
        {userName}
      </Txt>
      <FriendRequestHandler id={_id} />
    </TouchableOpacity>
  );
};

export default FriendListItem;
