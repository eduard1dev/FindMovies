import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Dimensions, FlatList } from 'react-native';

import Header from '../../components/Header';
import GenreButton from '../../components/GenreButton';
import CardMovie from '../../components/CardMovie';

import Carousel from 'react-native-reanimated-carousel';

import useHome, { MovieProps } from './useHome';

import {
  Container,
  GenresListContainer,
  TextStrong,
  TextLight,
  CarouselContainer,
  BackgroundImage,
} from './styles';

import { colors } from '../../styles';

const Home = ({ navigation }: any) => {
  const { width: screenWidth } = Dimensions.get('screen');

  const [backgroundImage, setBackgroundImage] = useState<number>(0);

  const {
    handleMovieSelected,
    handleGenreSelected,
    filteredMovies,
    genres,
    genreSelected,
  } = useHome();

  function handleSnapSlide(index: number) {
    setBackgroundImage(index);
  }

  return (
    <Container>
      <BackgroundImage
        source={
          filteredMovies[0] && {
            uri: `https://image.tmdb.org/t/p/original${filteredMovies[backgroundImage].poster_path}`,
          }
        }
        imageStyle={{ opacity: 0.15 }}
        blurRadius={8}
      >
        <StatusBar hidden={true} backgroundColor={colors.gray_dark} />
        <Header />
        <TextStrong>Genres</TextStrong>
        <GenresListContainer>
          <FlatList
            data={genres.data?.genres}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <GenreButton
                testID="genre-item"
                name={item.name}
                onPress={() => handleGenreSelected(item.id)}
                active={item.id === genreSelected}
              />
            )}
            horizontal={true}
            contentContainerStyle={{
              paddingHorizontal: 40,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </GenresListContainer>
        <View style={{ flexDirection: 'row' }}>
          <TextStrong>Popular</TextStrong>
          <TextLight>Movies</TextLight>
        </View>
        <CarouselContainer>
          <Carousel
            testID="carousel"
            autoPlayReverse={false}
            width={screenWidth}
            height={700}
            data={filteredMovies}
            mode="parallax"
            modeConfig={{ parallaxScrollingOffset: 85 }}
            renderItem={({ item }: { item: MovieProps }) => (
              <CardMovie
                underlayColor="transparent"
                testID="carousel-item"
                data={item}
                onPress={() => handleMovieSelected(item, navigation)}
              />
            )}
            onSnapToItem={(index) => handleSnapSlide(index)}
          />
        </CarouselContainer>
      </BackgroundImage>
    </Container>
  );
};

export default Home;
