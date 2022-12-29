import React from "react";
import { View } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Icons from "@expo/vector-icons/AntDesign";

import {
  Container,
  TextGreating,
  TextUser,
  Subtitle,
  ImageContainer,
  TextSignIn,
  ButtonSignIn,
} from "./styles";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatchProps, RootStateProps } from "../../store";
import { setUser, reset } from "../../store/User.store";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatchProps>();
  const { user } = useSelector((state: RootStateProps) => state.user);

  async function signInWithGoogle() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    try {
      const {
        user,
      }: {
        user: { displayName: string | null; photoURL: string | null };
      } = await auth().signInWithCredential(googleCredential);

      dispatch(
        setUser({
          displayName: user.displayName || "not found",
          photoURL: user.photoURL || "not found",
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await GoogleSignin.clearCachedAccessToken();

      dispatch(reset());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <View>
        <View style={{ flexDirection: "row" }}>
          <TextGreating>Hello</TextGreating>
          <TextUser>, {!!user ? user.displayName : "Guest"}!</TextUser>
        </View>
        <Subtitle>Find your favorite movie</Subtitle>
      </View>
      <ButtonSignIn onPress={() => (!!user ? signOut() : signInWithGoogle)}>
        {!!user ? (
          <ImageContainer source={{ uri: user.photoURL }} />
        ) : (
          <TextSignIn>singIn</TextSignIn>
        )}
      </ButtonSignIn>
    </Container>
  );
};

export default Header;
