import React from 'react';
import {useAppSelector} from '../../hooks';
import {ScreenWrapper} from '../../styles/styleComponents';
import Title from '../../components/Txts/Title';
import MainBtn from '../../components/MainBtn';
import {useTranslation} from 'react-i18next';
import {HomeScreenNavigationProp} from '../../types';
import {greeting} from '../../utils';

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home = ({navigation}: Props): JSX.Element => {
  const {rootStyles} = useAppSelector(state => state.styles);
  const {
    user: {firstName},
  } = useAppSelector(state => state.user);
  const {t} = useTranslation();

  return (
    <ScreenWrapper style={rootStyles.p4}>
      <Title tKey={greeting()} extraTxt={firstName} />
      <MainBtn onPress={() => navigation.navigate('CreateGame')}>
        {t('createGame')}
      </MainBtn>
    </ScreenWrapper>
  );
};

export default Home;
