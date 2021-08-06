import {View, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {assets, logger} from '../utils';
import ImagePicker from 'react-native-image-crop-picker';
import {useAppSelector} from '../hooks';
interface Props {
  setImg: React.Dispatch<React.SetStateAction<string>>;
  img: string;
  size?: number;
}
const AvatarPicker = ({setImg, img, size}: Props) => {
  const {colors} = useAppSelector(state => state.styles);

  return (
    <View>
      <Pressable
        onPress={() => {
          ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: true,
          })
            .then((image: any) => {
              setImg(`data:${image.mime};base64,${image.data}`);
            })
            .catch(({message}) => logger.warn(message));
        }}>
        <Image
          source={img ? {uri: img} : assets.profilePlaceholder}
          style={[
            styles.profilePlaceholder,
            size ? {width: size, height: size} : {},
          ]}
        />
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

export default AvatarPicker;
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
