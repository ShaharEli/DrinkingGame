import React from 'react';
import Title from '../../components/Txts/Title';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
const OnlineGame = () => {
  return (
    <ScreenWrapper>
      <WidthContainer>
        <Title tKey="onlineGame" withGoBackIcon />
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default OnlineGame;
