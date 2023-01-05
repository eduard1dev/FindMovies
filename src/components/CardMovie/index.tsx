import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";
import { useGlobalStore } from "../../store";

import { Container, CardImage, Title, TextWatchLater } from "./styles";

interface CardMovieProps extends RectButtonProps {
  data: {
    backdrop_path: string;
    original_language: string;
    original_title: string;
    vote_average: string;
    title: string;
    poster_path: string;
    id: number;
  };
}

function CardMovie({ data, ...rest }: CardMovieProps) {
  const moviesWatchLater = useGlobalStore((state) => state.moviesWatchLater);

  const image = {
    uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
  };

  return (
    <Container {...rest}>
      <CardImage
        testID="carousel-item-img"
        source={image}
        resizeMode={"stretch"}
      />
      <Title numberOfLines={1}>{data.title}</Title>
      {moviesWatchLater.includes(data.id) && (
        <TextWatchLater>Watch Later</TextWatchLater>
      )}
    </Container>
  );
}

export default CardMovie;
