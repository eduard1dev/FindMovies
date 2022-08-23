import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_300Light,
} from '@expo-google-fonts/roboto';

import Routes from './src/routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
