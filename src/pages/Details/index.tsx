import React from 'react'
import { View } from 'react-native'

import { RootState, AppDispatch } from '../../store'
import { useDispatch, useSelector } from 'react-redux'

import { Ionicons } from '@expo/vector-icons'

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
} from './styles'
import { toogleIncrement } from '../../store/MoviesWatchLater.store'


const Details: React.FC = ({route, navigation}: any) => {
    // estados do redux
    const dispatch = useDispatch<AppDispatch>()
    const { moviesWatchLater } = useSelector((state: RootState) => state.moviesWatchLater)

    // parâmetros da rota
    const { movie, firstMovieGenre } = route.params

    return (
        <Container>
            <ImageContainer
                source={{uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`}}
                resizeMode={ 'cover' }
            />
            <IconContainer
                onPress={() => navigation.navigate('Home')}
            >
                <Ionicons 
                    name='chevron-back' 
                    size={40}
                    color={'white'}
                />
            </IconContainer>
            <DetailsContainer>
                <HeaderDetails>
                    {
                        movie.adult && (
                            <DetailPseudoButton>
                                <TextDetail>
                                    test
                                </TextDetail>
                            </DetailPseudoButton>
                        )
                    }
                    <DetailPseudoButton>
                        <TextDetail>
                            {firstMovieGenre}
                        </TextDetail>
                    </DetailPseudoButton>
                    <DetailPseudoButton>
                        <TextDetail>
                            {movie.vote_average}
                        </TextDetail>
                    </DetailPseudoButton>
                    <WatchLaterButton
                        onPress={() => dispatch(toogleIncrement(movie.id))}
                        active={moviesWatchLater.includes(movie.id)}
                    >
                        <TextDetail>
                            Watch later
                        </TextDetail>
                    </WatchLaterButton>
                </HeaderDetails>
                <View 
                    style={{flex: 1, justifyContent: 'center'}}
                >
                    <Title>
                        {movie.title}
                    </Title>
                    <Subtitle
                        numberOfLines={5}
                    >
                        {movie.overview}
                    </Subtitle>
                    <Title>
                        Release Date
                    </Title>
                    <Subtitle>
                        {movie.release_date}
                    </Subtitle>
                </View>
            </DetailsContainer>
        </Container>
    )
}



export default Details