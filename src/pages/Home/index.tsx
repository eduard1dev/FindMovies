import React, { RefObject, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Dimensions, FlatList } from "react-native";

import Header from "../../components/Header";
import GenreButton from "../../components/GenreButton";
import CardMovie from "../../components/CardMovie";

import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import useHome, { MovieProps } from "./useHome";

import {
  Container,
  GenresListContainer,
  TextStrong,
  TextLight,
  CarouselContainer,
  BackgroundImage,
} from "./styles";

import { colors } from "../../styles";

const Home = ({ navigation }: any) => {
  const { width: screenWidth } = Dimensions.get("screen");
  let carouselRef: RefObject<ICarouselInstance> = useRef(null);

  const {
    handleMovieSelected,
    handleGenreSelected,
    filteredMovies,
    genres,
    genreSelected,
    backgroundImage,
    handleSnapSlide,
    setBackgroundImage,
  } = useHome();

  useEffect(() => {
    if (filteredMovies.length > 0 && backgroundImage !== 0) {
      carouselRef?.current?.scrollTo({
        index: 0,
        animated: false,
      });
      setBackgroundImage(0);
    }
  }, [filteredMovies]);

  return (
    <Container>
      <BackgroundImage
        source={
          filteredMovies[0] && {
            uri:
              filteredMovies[backgroundImage]?.poster_path &&
              `https://image.tmdb.org/t/p/w400${filteredMovies[backgroundImage].poster_path}`,
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
        <View style={{ flexDirection: "row" }}>
          <TextStrong>Popular</TextStrong>
          <TextLight>Movies</TextLight>
        </View>
        <CarouselContainer>
          <Carousel
            testID="carousel"
            ref={carouselRef}
            autoPlayReverse={false}
            width={screenWidth}
            height={580}
            data={filteredMovies}
            mode="parallax"
            style={{
              transform: [{ translateY: -16 }],
            }}
            defaultIndex={0}
            modeConfig={{
              parallaxScrollingOffset: 90,
              parallaxScrollingScale: 0.82,
              parallaxAdjacentItemScale: 0.65,
            }}
            onSnapToItem={(index) => handleSnapSlide(index)}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            renderItem={({ item }: { item: MovieProps }) => (
              <CardMovie
                underlayColor="transparent"
                testID="carousel-item"
                data={item}
                onPress={() => handleMovieSelected(item, navigation)}
              />
            )}
            loop={false}
          />
        </CarouselContainer>
      </BackgroundImage>
    </Container>
  );
};

export default Home;
