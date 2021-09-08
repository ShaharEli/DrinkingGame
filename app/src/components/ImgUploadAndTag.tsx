import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {
  LocalGameScreenNavigationProp,
  OnlineGameScreenNavigationProp,
} from '../types';
import Txt from './Txts/Txt';
import {logger} from '../utils';

interface Props {
  dareId: string;
  navigation: LocalGameScreenNavigationProp | OnlineGameScreenNavigationProp;
}

const ImgUploadAndTag = ({dareId, navigation}: Props) => {
  const {t} = useTranslation();

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
              navigation.navigate('AddImgScreen', {
                dareId,
                img: `data:${image.mime};base64,${image.data}`,
              });
            })
            .catch(({message}) => logger.warn(message));
        }}>
        <Txt>{t('addImg')}</Txt>
      </Pressable>
    </View>
  );
};

export default ImgUploadAndTag;
