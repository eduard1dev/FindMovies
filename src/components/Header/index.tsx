import React from "react";
import { View } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import {
  Container,
  TextGreating,
  TextUser,
  Subtitle,
  ImageContainer,
  TextSignIn,
  ButtonSignIn,
} from "./styles";

import UserImage from "../../../assets/baby-yoda.png";

const Header: React.FC = () => {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Container>
      <View>
        <View style={{ flexDirection: "row" }}>
          <TextGreating>Hello</TextGreating>
          <TextUser>, Eduardo!</TextUser>
        </View>
        <Subtitle>Find your favorite movie</Subtitle>
      </View>
      <ButtonSignIn
        onPress={() =>
          onGoogleButtonPress()
            .then(() => console.log("logged"))
            .catch((err) => console.error(err))
        }
      >
        {/* <ImageContainer source={UserImage} /> */}
        <TextSignIn>singIn</TextSignIn>
      </ButtonSignIn>
    </Container>
  );
};

export default Header;
