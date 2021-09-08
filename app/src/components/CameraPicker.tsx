import {View, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {logger} from '../utils';
import ImagePicker from 'react-native-image-crop-picker';
import {useAppSelector} from '../hooks';

interface Props {
  setImg: React.Dispatch<React.SetStateAction<string>>;
  img: string;
  children?: JSX.Element;
  size?: number;
}

const CameraPicker = ({setImg, img, size, children}: Props) => {
  const {colors} = useAppSelector(state => state.styles);

  return (
    <View>
      <Pressable
        onPress={() => {
          ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
          })
            .then((image: any) => {
              setImg(`data:${image.mime};base64,${image.data}`);
            })
            .catch(({message}) => logger.warn(message));
        }}>
        {img ? (
          <Image
            source={{uri: img}}
            style={[
              styles.profilePlaceholder,
              size ? {width: size, height: size} : {},
            ]}
          />
        ) : (
          children
        )}
      </Pressable>
      {img ? (
        <Icon
          name="highlight-remove"
          size={35}
          color={colors.font}
          style={styles.removeImg}
          onPress={() => setImg('')}
        />
      ) : null}
    </View>
  );
};

export default CameraPicker;
const styles = StyleSheet.create({
  profilePlaceholder: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 150,
  },
  removeImg: {position: 'absolute', right: '25%', top: '65%'},
});
