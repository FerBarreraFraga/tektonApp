import * as React from 'react';
import { Text, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import AppRouter from './src/AppRouter';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './store';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

Text.defaultProps = Text.defaultProps || {};
// Ignore dynamic type scaling on iOS
Text.defaultProps.allowFontScaling = false;


export default () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppRouter />
      </PaperProvider>
    </Provider>
  );
}