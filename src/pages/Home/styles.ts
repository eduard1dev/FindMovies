import styled from "styled-components/native";

import { colors, fonts } from "../../styles";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.gray_dark};
`;
export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.gray_dark};
`;
export const TextStrong = styled.Text`
  font-size: 22px;
  color: ${colors.white};
  font-family: ${fonts.Text1};
  margin-left: 40px;
  margin-bottom: 10px;
`;
export const TextLight = styled(TextStrong)`
  font-size: 22px;
  font-family: ${fonts.Text2};
  margin-left: 10px;
`;
export const GenresListContainer = styled.View`
  height: 40px;
  margin-bottom: 20px;
`;
export const CarouselContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
