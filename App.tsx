import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_300Light,
} from "@expo-google-fonts/roboto";

import Routes from "./src/routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

GoogleSignin.configure({
  webClientId: "",
});

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
