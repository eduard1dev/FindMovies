import React, { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_300Light,
} from "@expo-google-fonts/roboto";

import Routes from "./src/routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import auth from "@react-native-firebase/auth";
import { useGlobalStore } from "./src/store";

GoogleSignin.configure({
  webClientId:
    "208631863731-ni68lsde64bu75ieq159mqpimavu7vjl.apps.googleusercontent.com",
  scopes: ["profile"],
});

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const setUser = useGlobalStore((state) => state.setUser);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light,
  });

  function onAuthStateChanged(user: any) {
    if (user) {
      setUser({
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      });
    }
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
      <Routes />
    </QueryClientProvider>
  );
};

export default App;
