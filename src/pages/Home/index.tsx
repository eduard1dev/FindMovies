import React, {useEffect, useState, useRef} from 'react'
import { 
    View, 
    StatusBar,
    FlatList,
    Dimensions,

} from 'react-native'

import Api from '../../services/api'

import AppLoading from 'expo-app-loading'

import Header from '../../components/Header'
import GenreButton from '../../components/GenreButton'
import CardMovie from '../../components/CardMovie'

import Carousel from 'react-native-snap-carousel'


import {
    Container,
    GenresListContainer,
    TextStrong,
    TextLight,
    CarouselContainer,
    BackgroundImage,
} from './styles'

import { colors } from '../../styles'


interface GenresProps {
    id: string,
    name: string,
}

export interface MovieProps {
    backdrop_path: string,
    genre_ids: string[],
    id: string,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: string,
    adult: string,
}

const Home: React.FC = ({ navigation }: any) => {
    const {width: screenWidth} = Dimensions.get('window')

    const [genres, setGenres] = useState<GenresProps[]>([])
    const [genreSelected, setGenreSelected] = useState<string>()
    const [movies, setMovies] = useState<MovieProps[]>([])
    const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([])

    //referência para o carrossel
    const carouselRef = useRef(null)
    
    //tentar criar base url para a key não mostrar aqui ***
    async function fetchGenres(){
        const { data } = await Api.get('3/genre/movie/list?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US')
        if(!data){
            return <AppLoading/>
        }
        setGenres(data.genres)
    }

    async function fetchMovies(){
        const { data } = await Api.get('3/movie/popular?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US&page=1')
        if(!data){
            return <AppLoading/>
        }
        setMovies(data.results)
        setFilteredMovies(data.results)
    }

    // requisições à Api tmdb: Genres e Movies.
    useEffect(() => {
        fetchGenres()
        fetchMovies()
    }, [])

    function handleGenreSelected(genreId: string){
        if (genreSelected === genreId){
            setGenreSelected('0')
            setFilteredMovies(movies)
        }else{
            const filtered = movies.filter((movie) => (
                movie.genre_ids.includes(genreId)
            ))
            setFilteredMovies(filtered)
            setGenreSelected(genreId)
        }
    }

    function handleSnapSlide(index: number){
        setBackgroundImage(index)
    }

    // handle background image
    const [backgroundImage, setBackgroundImage] = useState<number>(0)

    //Navegação entre as rotas


    function handleMovieSelected(movie: MovieProps){
        let firstMovieGenre  = 'No Genre'
        genres.forEach((element) => {
            if(element.id === movie.genre_ids[0]){
                firstMovieGenre = element.name
            }
        })
        
        navigation.navigate('Details', { movie, firstMovieGenre })
    }

    return (
        <Container>
            <BackgroundImage
                source={
                    movies[0] 
                    && 
                    { uri: `https://image.tmdb.org/t/p/original${movies[backgroundImage].poster_path}`} 
                }
                imageStyle={{ opacity: 0.15 }}
                blurRadius={8}
            >
                <StatusBar
                    hidden={true}
                    barStyle={'dark-content'}
                    backgroundColor={colors.gray_dark}
                />
                <Header/>
                <TextStrong>
                    Genres
                </TextStrong>
                <GenresListContainer>
                    <FlatList
                        data={genres}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                                <GenreButton
                                    name={item.name}
                                    onPress={() => handleGenreSelected(item.id)}
                                    active={item.id === genreSelected}
                                />
                            )
                        }
                        horizontal={true}
                        contentContainerStyle={{
                            paddingHorizontal: 40,
                        }}
                        showsHorizontalScrollIndicator={false}
                    />
                </GenresListContainer>
                <View style={{ flexDirection: 'row' }}>
                    <TextStrong>
                        Popular 
                    </TextStrong>
                    <TextLight>
                        Movies
                    </TextLight>
                </View>
                <CarouselContainer>
                    <Carousel
                        layout={'default'}
                        data={filteredMovies}
                        ref={carouselRef}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}: { item: MovieProps}) => (
                                <CardMovie
                                    data={item}
                                    onPress={() => handleMovieSelected(item)}
                                />
                            )
                        }
                        sliderWidth={screenWidth}
                        itemWidth={250}
                        inactiveSlideOpacity={0.5}
                        onSnapToItem={(index) => handleSnapSlide(index)}
                    />
                </CarouselContainer>
            </BackgroundImage>
        </Container>
            
    )
}



export default Home