import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {loginWithToken} from '../redux/slices';
import Loading from '../components/Loading/Loading';
import {useAppDispatch, useAppSelector} from '../hooks';
import {getInitialTheme} from '../redux/slices';
import {navigationRef} from './navigation';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const RoutesContainer = () => {
  const dispatch = useAppDispatch();
  const {loadingTheme} = useAppSelector(state => state.styles);
  const {loadingAuth, isSignedIn} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getInitialTheme());
    dispatch(loginWithToken());
  }, [dispatch]);

  if (loadingAuth || loadingTheme) return <Loading />;

  return (
    <NavigationContainer ref={navigationRef}>
      {isSignedIn ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default RoutesContainer;
