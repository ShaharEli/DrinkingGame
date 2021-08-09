import {useIsFocused} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {getFriendsList} from '../../api';
import FriendsList from '../../components/FriendsList';
import Title from '../../components/Txts/Title';
import {useAppSelector} from '../../hooks';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {IFriend} from '../../types';
import {FriendRequestsStatusEnum} from '../../utils';

const FriendRequests = () => {
  const {user} = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IFriend[]>([]);
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const friendsToSet = await getFriendsList(
      user.friendRequests
        .filter(
          req =>
            req.from !== user._id &&
            req.status === FriendRequestsStatusEnum.PENDING,
        )
        .map(({from}) => from),
    );
    setLoading(false);
    setData(friendsToSet);
  }, [user._id, user.friendRequests]);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchRequests();
  }, [isFocused, fetchRequests]);

  return (
    <ScreenWrapper>
      <WidthContainer>
        <Title tKey="friendReqs" />
        <FriendsList
          addOptionOn
          loading={loading}
          data={data}
          isSearcing={false}
        />
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default FriendRequests;
