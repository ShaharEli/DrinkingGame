import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  _id: string;
  avatar: string;
  onPress: (id: string) => void;
  tagged: boolean;
}

const Tag = ({_id, avatar, onPress, tagged}: Props) => {
  console.log(tagged);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(_id)}>
      <Text>{_id}</Text>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
