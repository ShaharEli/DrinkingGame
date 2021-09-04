import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ScreenWrapper} from '../../styles/styleComponents';
import Title from '../../components/Txts/Title';
import MainBtn from '../../components/MainBtn';
import {useTranslation} from 'react-i18next';
import {HomeScreenNavigationProp} from '../../types';
import {greeting} from '../../utils';
import FloatingBtn from '../../components/FloatingBtn';
import Txt from '../../components/Txts/Txt';
import {fetchGameAction} from '../../redux/actions';

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home = ({navigation}: Props): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const {rootStyles} = useAppSelector(state => state.styles);
  const {isInGame, game, loadingGame} = useAppSelector(state => state.game);
  const {
    user: {firstName},
  } = useAppSelector(state => state.user);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    if (isInGame) {
      dispatch(fetchGameAction({_id: game._id}));
    }
    setLoading(false);
  }, [game._id, isInGame, dispatch]);

  return (
    <ScreenWrapper style={rootStyles.p4}>
      <Title tKey={greeting()} extraTxt={firstName} />
      <MainBtn onPress={() => navigation.navigate('CreateGame')}>
        {t('createGame')}
      </MainBtn>
      {isInGame && !loadingGame && !loading && (
        <FloatingBtn
          onPress={() =>
            navigation.navigate(
              game.type === 'local' ? 'LocalGame' : 'OnlineGame',
            )
          }>
          <Txt color="BG">{t('returnToGame')}</Txt>
        </FloatingBtn>
      )}
    </ScreenWrapper>
  );
};

export default Home;
