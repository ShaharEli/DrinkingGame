import React from 'react';
import {View} from 'react-native';
import {titelize} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../hooks';
import Txt from './Txt';
import {useTranslation} from 'react-i18next';

interface Props {
  tKey: string;
  withGoBackIcon?: boolean;
  extraTxt?: string;
}
const Title = ({tKey, withGoBackIcon, extraTxt}: Props): JSX.Element => {
  const navigation = useNavigation();
  const {rootStyles, colors} = useAppSelector(state => state.styles);
  const {t, i18n} = useTranslation();

  return (
    <View style={[rootStyles.flexRow, rootStyles.alignCenter, rootStyles.mb3]}>
      {withGoBackIcon && (
        <Ionicons
          name={i18n.dir() === 'ltr' ? 'arrow-back' : 'arrow-forward'}
          size={30}
          style={{...rootStyles.mt1, ...rootStyles.me2}}
          color={colors.font}
          onPress={() => navigation.goBack()}
        />
      )}
      <Txt style={[rootStyles.h3]}>
        {titelize(t(tKey))}
        {extraTxt ? ` ${extraTxt}` : ''}
      </Txt>
    </View>
  );
};

export default Title;
