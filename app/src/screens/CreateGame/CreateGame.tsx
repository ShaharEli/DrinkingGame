import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import MainBtn from '../../components/MainBtn';
import Title from '../../components/Txts/Title';
import Txt from '../../components/Txts/Txt';
import {useAppSelector} from '../../hooks';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {CreateGameNavigationProp} from '../../types';

interface Props {
  navigation: CreateGameNavigationProp;
}

const CreateGame = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {rootStyles} = useAppSelector(state => state.styles);
  return (
    <ScreenWrapper>
      <WidthContainer>
        <Title tKey="createGame" withGoBackIcon />
        <View>
          <Txt style={[rootStyles.alignSelfCenter, rootStyles.mb3]} size={20}>
            {t('chooseGameType')}
          </Txt>
          <MainBtn
            style={styles.gameBtn}
            onPress={() => navigation.navigate('LocalGame')}>
            {t('local')}
          </MainBtn>
          <MainBtn
            style={styles.gameBtn}
            onPress={() => navigation.navigate('OnlineGame')}>
            {t('online')}
          </MainBtn>
        </View>
      </WidthContainer>
      <Text />
    </ScreenWrapper>
  );
};

export default CreateGame;

const styles = StyleSheet.create({
  gameBtn: {
    marginVertical: 10,
    borderRadius: 5,
  },
});
