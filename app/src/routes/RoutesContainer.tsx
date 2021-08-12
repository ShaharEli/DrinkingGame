import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Loading from '../components/Loading/Loading';
import {useAppDispatch, useAppSelector} from '../hooks';
import {getInitialThemeAction, loginWithTokenAction} from '../redux/actions';
import {navigationRef} from './navigation';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const RoutesContainer = () => {
  const dispatch = useAppDispatch();
  const {loadingTheme} = useAppSelector(state => state.styles);
  const {loadingAuth, isSignedIn} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getInitialThemeAction());
    dispatch(loginWithTokenAction());
  }, [dispatch]);

  if (loadingTheme || (loadingAuth && !isSignedIn)) return <Loading />;

  return (
    <NavigationContainer ref={navigationRef}>
      {isSignedIn ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default RoutesContainer;
