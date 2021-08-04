import React from 'react';
import {useAppSelector} from '../../hooks';
import {ScreenWrapper} from '../../styles/styleComponents';
import Title from '../../components/Txts/Title';

const Home = (): JSX.Element => {
  const {rootStyles} = useAppSelector(state => state.styles);
  const {
    user: {firstName, lastName},
  } = useAppSelector(state => state.user);

  return (
    <ScreenWrapper style={rootStyles.p4}>
      <Title tKey="hello" extraTxt={`${firstName} ${lastName}`} />
    </ScreenWrapper>
  );
};

export default Home;
