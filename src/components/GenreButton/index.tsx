import React from 'react'
import { 
    View 
} from 'react-native'

import {
    Container,
    Name,
} from './styles'

import { RectButtonProps } from 'react-native-gesture-handler'

interface GenreButtonProps extends RectButtonProps{
    name: string,
    active?: boolean,
}

function GenreButton({
    name, 
    active = false, 
    ...rest
}: GenreButtonProps) {
    return (
        <Container
            active={active}
            {...rest}
        >
            <Name 
                active={active}
            >
                {name}
            </Name>
        </Container>
    )
}

export default GenreButton