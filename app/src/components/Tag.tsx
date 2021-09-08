import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from './Avatar';
import Txt from './Txts/Txt';

interface Props {
  _id: string;
  avatar: string;
  onPress: (id: string) => void;
  tagged: boolean;
  isActive: boolean;
  userName: string;
}

const Tag = ({_id, avatar, onPress, tagged, isActive, userName}: Props) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={() => onPress(_id)}>
      <Avatar img={avatar} size={30} {...{isActive, tagged}} />
      <Txt>{userName}</Txt>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    alignItems: 'center',
  },
});
