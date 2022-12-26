import styled from "styled-components/native";

import { RectButton } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

import { colors, fonts } from "../../styles";

export const Container = styled(RectButton)`
  display: flex;
  width: 100%;
  height: 100%;
`;
export const CardImage = styled(FastImage)`
  width: 100%;
  flex: 1;
  border-radius: 20px;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-family: ${fonts.Text1};
  color: ${colors.white};
  padding-right: 20px;
  padding-left: 10px;
  margin-top: 10px;
`;
export const TextWatchLater = styled.Text`
  font-size: 18px;
  font-family: ${fonts.Text1};
  color: ${colors.red};
  padding-right: 20px;
  padding-left: 10px;
`;
