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
import {persistor, store} from './src/redux/store';
import RoutesContainer from './src/routes/RoutesContainer';
import ErrorBoundary from './src/screens/ErrorBoundry';
import {PersistGate} from 'redux-persist/integration/react';

LogBox.ignoreLogs(LOGS_TO_IGNORE);

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ErrorBoundary>
          <RoutesContainer />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;
