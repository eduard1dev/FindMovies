import React from "react";
import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  IconContainer,
  ImageContainer,
  DetailsContainer,
  HeaderDetails,
  Title,
  Subtitle,
  DetailPseudoButton,
  TextDetail,
  WatchLaterButton,
} from "./styles";
import { useGlobalStore } from "../../store";

const Details: React.FC = ({ route, navigation }: any) => {
  const moviesWatchLater = useGlobalStore((state) => state.moviesWatchLater);
  const setMoviesWatchLater = useGlobalStore(
    (state) => state.setMoviesWatchLater
  );

  // parâmetros da rota
  const { movie, firstMovieGenre } = route.params;

  return (
    <Container>
      <ImageContainer
        testID="details-banner-image"
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        }}
        resizeMode={"cover"}
      />
      <IconContainer onPress={() => navigation.navigate("Home")}>
        <Ionicons name="chevron-back" size={40} color={"white"} />
      </IconContainer>
      <DetailsContainer>
        <HeaderDetails>
          {movie.adult && (
            <DetailPseudoButton>
              <TextDetail>test</TextDetail>
            </DetailPseudoButton>
          )}
          <DetailPseudoButton>
            <TextDetail>{firstMovieGenre}</TextDetail>
          </DetailPseudoButton>
          <DetailPseudoButton>
            <TextDetail>{movie.vote_average}</TextDetail>
          </DetailPseudoButton>
          <WatchLaterButton
            onPress={() => {
              setMoviesWatchLater(movie.id);
            }}
            active={moviesWatchLater.includes(movie.id)}
          >
            <TextDetail>Watch later</TextDetail>
          </WatchLaterButton>
        </HeaderDetails>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Title>{movie.title}</Title>
          <Subtitle numberOfLines={5}>{movie.overview}</Subtitle>
          <Title>Release Date</Title>
          <Subtitle>{movie.release_date}</Subtitle>
        </View>
      </DetailsContainer>
    </Container>
  );
};

export default Details;
