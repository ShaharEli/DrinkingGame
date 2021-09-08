import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Dare from '../../components/Dare/Dare';
import If from '../../components/If';
import MainBtn from '../../components/MainBtn';
import Title from '../../components/Txts/Title';
import {useAppDispatch, useAppSelector, useDares} from '../../hooks';
import {createGameAction, fetchGameAction} from '../../redux/actions';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {GameTypes} from '../../types';
import {MAX_HEIGHT} from '../../utils';

const LocalGame = ({navigation}) => {
  const {rootStyles, colors} = useAppSelector(state => state.styles);
  const {game, isInGame, loadingGame} = useAppSelector(state => state.game);
  const {dare, fetchNewDare} = useDares();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    if (!isInGame) {
      dispatch(createGameAction({participants: [], type: GameTypes.Local}));
    } else {
      dispatch(fetchGameAction({_id: game._id}));
    }
  }, [isFocused, dispatch, isInGame, game._id]);

  return (
    <ScreenWrapper>
      <WidthContainer>
        <Title tKey="localGame" withGoBackIcon />
        <If cond={loadingGame}>
          <View style={rootStyles.box}>
            <ActivityIndicator size="large" color={colors.font} />
          </View>
        </If>
        <If cond={!!dare && isInGame}>
          <View style={[rootStyles.box, styles.container]}>
            <Dare
              dare={dare!}
              participants={game.participants}
              gameId={game._id}
              navigation={navigation}
            />
          </View>
          <View>
            <MainBtn onPress={fetchNewDare}>next</MainBtn>
          </View>
        </If>
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default LocalGame;

const styles = StyleSheet.create({
  container: {
    height: 0.5 * MAX_HEIGHT,
    width: '100%',
  },
});
