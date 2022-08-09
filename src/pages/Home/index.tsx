import React, { useEffect, useState, useRef } from 'react';
import { View, StatusBar, FlatList, Dimensions } from 'react-native';

import Api from '../../services/api';

import Header from '../../components/Header';
import GenreButton from '../../components/GenreButton';
import CardMovie from '../../components/CardMovie';

import Carousel from 'react-native-reanimated-carousel';

import {
  Container,
  GenresListContainer,
  TextStrong,
  TextLight,
  CarouselContainer,
  BackgroundImage,
} from './styles';

import { colors } from '../../styles';
import useGetMovies, { MovieProps } from '../../hooks/useGetMovies';

const Home = ({ navigation }: any) => {
  const { width: screenWidth } = Dimensions.get('screen');

  const {
    fetchMovies,
    fetchGenres,
    handleMovieSelected,
    handleGenreSelected,
    filteredMovies,
    genres,
    genreSelected,
  } = useGetMovies();

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  function handleSnapSlide(index: number) {
    setBackgroundImage(index);
  }

  const [backgroundImage, setBackgroundImage] = useState<number>(0);

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
        <StatusBar
          hidden={true}
          barStyle={'dark-content'}
          backgroundColor={colors.gray_dark}
        />
        <Header />
        <TextStrong>Genres</TextStrong>
        <GenresListContainer>
          <FlatList
            data={genres}
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
          {/* <Carousel
            layout={'default'}
            data={filteredMovies}
            ref={carouselRef}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: { item: MovieProps }) => (
              <CardMovie
                data={item}
                onPress={() => handleMovieSelected(item)}
              />
            )}
            sliderWidth={screenWidth}
            itemWidth={250}
            inactiveSlideOpacity={0.5}
            onSnapToItem={(index) => handleSnapSlide(index)}
          /> */}
          <Carousel
            testID="carousel"
            autoPlayReverse={false}
            width={screenWidth}
            height={300}
            data={filteredMovies}
            renderItem={({ item }: { item: MovieProps }) => (
              <CardMovie
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
