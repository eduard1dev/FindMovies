import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_300Light,
} from "@expo-google-fonts/roboto";

import Routes from "./src/routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import auth from "@react-native-firebase/auth";
import store from "./src/store";
import { setUser, UserProps } from "./src/store/User.store";

GoogleSignin.configure({
  webClientId:
    "208631863731-ni68lsde64bu75ieq159mqpimavu7vjl.apps.googleusercontent.com",
  scopes: ["profile"],
});

const App: React.FC = () => {
  const queryClient = new QueryClient();

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light,
  });

  function onAuthStateChanged(user: any) {
    store.dispatch(
      setUser({
        displayName: user.displayName || "not found",
        photoURL: user.photoURL || "not found",
      })
    );
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
