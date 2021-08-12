import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  dareId: string;
}

const ImgUploadAndTag = ({dareId}: Props) => {
  return (
    <View>
      <Text>{dareId}</Text>
    </View>
  );
};

export default ImgUploadAndTag;
