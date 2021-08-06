/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {LOGS_TO_IGNORE} from './src/utils';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import RoutesContainer from './src/routes/RoutesContainer';
import ErrorBoundary from './src/screens/ErrorBoundry';

LogBox.ignoreLogs(LOGS_TO_IGNORE);

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RoutesContainer />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
