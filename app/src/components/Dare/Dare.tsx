import React from 'react';
import {useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../hooks';
import {IDare, Maybe} from '../../types';
import {assets, composeAnimations, fadeIn, scale} from '../../utils';
import Txt from '../Txts/Txt';
import * as Animatable from 'react-native-animatable';
import {useRef} from 'react';
import {useEffect} from 'react';
import ImgUploadAndTag from '../ImgUploadAndTag';

interface Props {
  dare: IDare;
  gameId: string;
  participants: Maybe<string[]>;
  gameType;
}
const Dare = ({
  dare: {_id, img, punishment, type, text},
}: // gameId,
// gameType,
// participants,
Props) => {
  const imgAsset = useMemo(() => {
    if (img) return {uri: img};
    if (type === 'question') return assets.questionMark;
    return assets.exclamationMark;
  }, [img, type]);

  const dareContainerRef = useRef<Animatable.View & View>(null);
  const {rootStyles, colors} = useAppSelector(state => state.styles);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (!dareContainerRef?.current) return; //@ts-ignore //TODO: remove when animate will be added to typing follow: https://github.com/oblador/react-native-animatable/issues/328
    dareContainerRef.current.animate(composeAnimations(fadeIn, scale));
  }, [dareContainerRef, _id]);

  return (
    <Animatable.View
      ref={dareContainerRef}
      animation={composeAnimations(fadeIn, scale)}
      easing="ease-in-back"
      useNativeDriver
      style={[
        styles.container,
        rootStyles.shadow,
        {borderColor: colors.HEADER},
      ]}>
      <Txt style={[rootStyles.alignSelfCenter, rootStyles.h3]}>
        {type === 'question' ? 'answer: ' : ''}
        {text}
      </Txt>
      <Image source={imgAsset} style={styles.img} />
      <Txt style={[rootStyles.alignSelfCenter, rootStyles.h3]}>
        or: {punishment}
      </Txt>
      <ImgUploadAndTag dareId={_id} />
    </Animatable.View>
  );
};

export default Dare;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    margin: 10,
    alignSelf: 'center',
  },
  container: {
    padding: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
});
