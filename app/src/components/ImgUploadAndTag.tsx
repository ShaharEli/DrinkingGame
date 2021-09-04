import React from 'react';
import {Text, View} from 'react-native';
// import {useAppDispatch, useAppSelector} from '../hooks';
// import {addImgToDareAction} from '../redux/actions';

interface Props {
  dareId: string;
}

const ImgUploadAndTag = ({dareId}: Props) => {
  // const {game, loadingGame} = useAppSelector(state => state.game);
  // const dispatch = useAppDispatch();
  return (
    <View>
      <Text>{dareId}</Text>
    </View>
  );
};

export default ImgUploadAndTag;
