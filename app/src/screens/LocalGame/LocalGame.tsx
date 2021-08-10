import React from 'react';
import {StyleSheet, View} from 'react-native';
import Dare from '../../components/Dare/Dare';
import If from '../../components/If';
import MainBtn from '../../components/MainBtn';
import Title from '../../components/Txts/Title';
import {useAppSelector, useDares} from '../../hooks';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {MAX_HEIGHT} from '../../utils';

const LocalGame = () => {
  const {rootStyles} = useAppSelector(state => state.styles);

  const {dare, fetchNewDare} = useDares();

  return (
    <ScreenWrapper>
      <WidthContainer>
        <Title tKey="localGame" withGoBackIcon />
        <View style={[rootStyles.box, styles.container]}>
          <If cond={!!dare}>
            <Dare dare={dare!} />
          </If>
        </View>
        <View>
          <MainBtn onPress={fetchNewDare}>next</MainBtn>
        </View>
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
