import {TextStyle, ViewStyle} from 'react-native';
import {Colors} from '../../types';

export const fontSize = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
  paragraph: 14,
  small: 12,
  xs: 10,
};

const h1: TextStyle = {
  lineHeight: 90,
  fontSize: fontSize.h1,
  fontWeight: '700',
};

export const font = ({font}: {font: string}): TextStyle => ({
  color: font,
});

export const bg = ({bg}: {bg: string}): ViewStyle => ({
  backgroundColor: bg,
});
const h2: TextStyle = {
  lineHeight: 64,
  fontSize: fontSize.h2,
  fontWeight: '700',
};

const h3: TextStyle = {
  lineHeight: 45,
  fontSize: fontSize.h3,
  fontWeight: '700',
};

const box: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
};
const strong: TextStyle = {
  fontWeight: 'bold',
};

const disabled: ViewStyle = {
  opacity: 0.3,
};

const flexRow: ViewStyle = {
  flexDirection: 'row',
};
const alignCenter: ViewStyle = {
  alignItems: 'center',
};

const alignItemsEnd: ViewStyle = {
  alignItems: 'flex-end',
};
const alignItemStart: ViewStyle = {
  alignItems: 'flex-start',
};

const alignSelfEnd: ViewStyle = {
  alignSelf: 'flex-end',
};

const alignSelfStart: ViewStyle = {
  alignSelf: 'flex-start',
};
const alignSelfCenter: ViewStyle = {
  alignSelf: 'center',
};
const justifyCenter: ViewStyle = {
  justifyContent: 'center',
};
const justifyStart: ViewStyle = {
  justifyContent: 'flex-start',
};
const justifyEnd: ViewStyle = {
  justifyContent: 'flex-end',
};
const flexWrap: ViewStyle = {
  flexWrap: 'wrap',
};
const spaceEvenly: ViewStyle = {
  justifyContent: 'space-evenly',
};
const spaceBetween: ViewStyle = {
  justifyContent: 'space-between',
};
const spaceAround: ViewStyle = {
  justifyContent: 'space-around',
};
const flex1: ViewStyle = {
  flex: 1,
};
const flex2: ViewStyle = {
  flex: 2,
};
const flex3: ViewStyle = {
  flex: 3,
};
const flex4: ViewStyle = {
  flex: 4,
};
const flex5: ViewStyle = {
  flex: 5,
};
const ps0: ViewStyle = {
  paddingStart: 0,
};
const ps1: ViewStyle = {
  paddingStart: 1,
};
const ps2: ViewStyle = {
  paddingStart: 2,
};
const ps3: ViewStyle = {
  paddingStart: 3,
};
const ps4: ViewStyle = {
  paddingStart: 4,
};
const ps5: ViewStyle = {
  paddingStart: 5,
};
const pe0: ViewStyle = {
  paddingEnd: 0,
};
const pe1: ViewStyle = {
  paddingEnd: 1,
};
const pe2: ViewStyle = {
  paddingEnd: 2,
};
const pe3: ViewStyle = {
  paddingEnd: 3,
};
const pe4: ViewStyle = {
  paddingEnd: 4,
};
const pe5: ViewStyle = {
  paddingEnd: 5,
};
const pt0: ViewStyle = {
  paddingTop: 0,
};
const pt1: ViewStyle = {
  paddingTop: 2.5,
};
const pt2: ViewStyle = {
  paddingTop: 5,
};
const pt3: ViewStyle = {
  paddingTop: 10,
};
const pt4: ViewStyle = {
  paddingTop: 15,
};
const pt5: ViewStyle = {
  paddingTop: 20,
};
const pb0: ViewStyle = {
  paddingBottom: 0,
};
const pb1: ViewStyle = {
  paddingBottom: 2.5,
};
const pb2: ViewStyle = {
  paddingBottom: 5,
};
const pb3: ViewStyle = {
  paddingBottom: 10,
};
const pb4: ViewStyle = {
  paddingBottom: 15,
};
const pb5: ViewStyle = {
  paddingBottom: 20,
};
const pb6: ViewStyle = {
  paddingBottom: 25,
};
const pb7: ViewStyle = {
  paddingBottom: 30,
};
const py1: ViewStyle = {
  paddingVertical: 2.5,
};
const py2: ViewStyle = {
  paddingVertical: 5,
};
const py3: ViewStyle = {
  paddingVertical: 10,
};
const py4: ViewStyle = {
  paddingVertical: 15,
};
const py5: ViewStyle = {
  paddingVertical: 20,
};
const px0: ViewStyle = {
  paddingHorizontal: 0,
};
const px1: ViewStyle = {
  paddingHorizontal: 2.5,
};
const px2: ViewStyle = {
  paddingHorizontal: 5,
};
const px3: ViewStyle = {
  paddingHorizontal: 10,
};
const px4: ViewStyle = {
  paddingHorizontal: 15,
};
const px5: ViewStyle = {
  paddingHorizontal: 20,
};
const mt1: ViewStyle = {
  marginTop: 2.5,
};
const mt2: ViewStyle = {
  marginTop: 5,
};
const mt3: ViewStyle = {
  marginTop: 10,
};
const mt4: ViewStyle = {
  marginTop: 15,
};
const mt5: ViewStyle = {
  marginTop: 20,
};
const mt6: ViewStyle = {
  marginTop: 25,
};
const mt7: ViewStyle = {
  marginTop: 30,
};
const mt9: ViewStyle = {
  marginTop: 35,
};
const mt10: ViewStyle = {
  marginTop: 40,
};
const mb1: ViewStyle = {
  marginBottom: 2.5,
};
const mb2: ViewStyle = {
  marginBottom: 5,
};
const mb3: ViewStyle = {
  marginBottom: 10,
};
const mb4: ViewStyle = {
  marginBottom: 15,
};
const mb5: ViewStyle = {
  marginBottom: 20,
};
const me1: ViewStyle = {
  marginEnd: 2.5,
};
const me2: ViewStyle = {
  marginEnd: 5,
};
const me3: ViewStyle = {
  marginEnd: 10,
};
const me4: ViewStyle = {
  marginEnd: 15,
};
const me5: ViewStyle = {
  marginEnd: 20,
};
const ms1: ViewStyle = {
  marginStart: 2.5,
};
const ms2: ViewStyle = {
  marginStart: 5,
};
const ms3: ViewStyle = {
  marginStart: 10,
};
const ms4: ViewStyle = {
  marginStart: 15,
};
const ms5: ViewStyle = {
  marginStart: 20,
};
const my1: ViewStyle = {
  marginVertical: 2.5,
};
const my2: ViewStyle = {
  marginVertical: 5,
};
const my3: ViewStyle = {
  marginVertical: 10,
};
const my4: ViewStyle = {
  marginVertical: 15,
};
const my5: ViewStyle = {
  marginVertical: 20,
};
const mx1: ViewStyle = {
  marginHorizontal: 2.5,
};
const mx2: ViewStyle = {
  marginHorizontal: 5,
};
const mx3: ViewStyle = {
  marginHorizontal: 10,
};
const mx4: ViewStyle = {
  marginHorizontal: 15,
};
const mx5: ViewStyle = {
  marginHorizontal: 20,
};
const hidden: ViewStyle = {
  display: 'none',
};
const textAlignCenter: TextStyle = {
  textAlign: 'center',
};
const text: TextStyle = {
  textAlign: 'left',
};

export default {
  box,
  h1,
  h2,
  h3,
  container,
  strong,
  disabled,
  flexRow,
  alignCenter,
  alignItemStart,
  alignItemsEnd,
  alignSelfEnd,
  alignSelfStart,
  alignSelfCenter,
  justifyCenter,
  justifyStart,
  justifyEnd,
  flexWrap,
  spaceEvenly,
  spaceBetween,
  spaceAround,
  flex1,
  flex2,
  flex3,
  flex4,
  flex5,
  ps0,
  ps1,
  ps2,
  ps3,
  ps4,
  ps5,
  pe0,
  pe1,
  pe2,
  pe3,
  pe4,
  pe5,
  pt0,
  pt1,
  pt2,
  pt3,

  pt4,
  pt5,
  pb0,
  pb1,
  pb2,
  pb3,
  pb4,
  pb5,
  pb6,
  pb7,
  py1,
  py2,
  py3,
  py4,
  py5,
  px0,
  px1,
  px2,
  px3,
  px4,
  px5,
  mt1,
  mt2,
  mt3,
  mt4,
  mt5,
  mt6,
  mt7,
  mt9,
  mt10,
  mb1,
  mb2,
  mb3,
  mb4,
  mb5,
  me1,
  me2,
  me3,
  me4,
  me5,
  ms1,
  ms2,
  ms3,
  ms4,
  ms5,
  my1,
  my2,
  my3,
  my4,
  my5,
  mx1,
  mx2,
  mx3,
  mx4,
  mx5,
  hidden,
  textAlignCenter,
  text,
};
