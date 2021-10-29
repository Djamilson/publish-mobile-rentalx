import React, { useEffect } from 'react';

import { LogBox, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
//import codePush from 'react-native-code-push';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { ThemeProvider } from 'styled-components';
import theme from './global/theme';
import { AppProvider } from './hooks';
import { Routes } from './routes';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'VirtualizedLists should never be nested',
  'Possible Unhandled Promise Rejection',
]);

/*let codePushOptions = {
  checkFrequency: codePush?.CheckFrequency.ON_APP_RESUME,
  installMode: codePush?.InstallMode.IMMEDIATE,
};

async function myCodePush() {
  const syncWithCodePush = (status: any) => {
    console.log('Codepush sync status', status);
  };

  await codePush.sync(
    { installMode: codePush.InstallMode.IMMEDIATE },
    syncWithCodePush,
  );
}*/

function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    // myCodePush();

    return <AppLoading />;
  }

  /*
  useEffect(() => {
    console.log('Codepush sync status', __DEV__);
    myCodePush();
  }, []);*/

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}

//export default __DEV__ ? App : codePush(codePushOptions)(App);

//export default codePush(codePushOptions)(App);

export default App;
