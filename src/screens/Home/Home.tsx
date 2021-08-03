import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../hooks';
import {ScreenWrapper} from '../../styles/styleComponents';
import Txt from '../../components/Txt';

const Home = (): JSX.Element => {
  const {rootStyles} = useAppSelector(state => state.styles);
  const {
    user: {firstName, lastName},
  } = useAppSelector(state => state.user);

  const {t} = useTranslation();
  return (
    <ScreenWrapper style={rootStyles.p4}>
      <Txt style={rootStyles.h3}>
        {t('hello')} {`${firstName} ${lastName}`}
      </Txt>
    </ScreenWrapper>
  );
};

export default Home;
