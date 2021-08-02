import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';
import {useAppSelector} from '../../hooks';
import {ScreenWrapper} from '../../styles/styleComponents';
import {font} from '../../styles/themes/general';
import Entypo from 'react-native-vector-icons/Entypo';

const HomeScreen = () => {
  const {colors, rootStyles} = useAppSelector(state => state.styles);
  const {
    user: {firstName, lastName},
  } = useAppSelector(state => state.user);

  const {t} = useTranslation();
  return (
    <ScreenWrapper style={rootStyles.p4}>
      <Entypo
        name="dots-three-horizontal"
        color={colors.font}
        style={styles.settingsIcon}
        size={20}
        onPress={() => console.log('object')}
      />
      <Text style={[rootStyles.h3, font(colors)]}>
        {t('hello')} {`${firstName} ${lastName}`}
      </Text>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  settingsIcon: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
