import React from 'react';
import { Image, Text } from 'react-native';

import { RootState } from '../../store';
import { useSelector } from 'react-redux';

import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, CardImage, Title, TextWatchLater } from './styles';

interface CardMovieProps extends RectButtonProps {
  data: {
    backdrop_path: string;
    original_language: string;
    original_title: string;
    vote_average: string;
    title: string;
    poster_path: string;
    id: string;
  };
}

function CardMovie({ data, ...rest }: CardMovieProps) {
  const { moviesWatchLater } = useSelector(
    (state: RootState) => state.moviesWatchLater,
  );

  const image = {
    uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
  };

  return (
    <Container {...rest}>
      <CardImage
        testID="carousel-item-img"
        source={image}
        resizeMode={'stretch'}
      />
      <Title numberOfLines={1}>{data.title}</Title>
      {moviesWatchLater.includes(data.id) && (
        <TextWatchLater>Watch Later</TextWatchLater>
      )}
    </Container>
  );
}

export default CardMovie;
