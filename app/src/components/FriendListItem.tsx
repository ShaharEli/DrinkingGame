import React from 'react';
import {Text, View} from 'react-native';
import {SocialScreenNavigationProp} from '../types';
interface Props {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  navigation: SocialScreenNavigationProp;
}
const FriendListItem = ({
  navigation,
  _id,
  firstName,
  lastName,
  userName,
}: Props): JSX.Element => {
  console.log(navigation, _id, firstName, lastName, userName);

  return (
    <View>
      <Text />
    </View>
  );
};

export default FriendListItem;
