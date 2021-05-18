import React from 'react'
import {
    Image,
    Text
} from 'react-native'

import {
    Container,
    CardImage,
    Title,
} from './styles'



interface CardMovieProps {
    data: {
        backdrop_path: string,
        original_language: string,
        original_title: string,
        vote_average: string,
        title: string,
        poster_path: string,
    }
}

function CardMovie({ data }: CardMovieProps){
    const image = { uri: `https://image.tmdb.org/t/p/original${data.poster_path}`}

    return(
        <Container>
            <CardImage
                source={image}
                resizeMode={'stretch'}
            />
            <Title
                numberOfLines={1}
            >
                {data.title}
            </Title>
        </Container>
    )
}

export default CardMovie