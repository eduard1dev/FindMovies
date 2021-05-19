import React from 'react'
import { 
    View,
} from 'react-native'
 
import {
    Container,
    TextGreating,
    TextUser,
    Subtitle,
    ImageContainer,
} from './styles'

import { colors } from '../../styles'

import UserImage from '../../../assets/baby-yoda.png'

const Header: React.FC = () => {
    return (
        <Container>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TextGreating>
                        Hello
                    </TextGreating>
                    <TextUser>
                        , Eduardo!
                    </TextUser>
                </View>
                <Subtitle>
                    Find your favorite movie
                </Subtitle>
            </View>
            <ImageContainer source={UserImage} />
        </Container>
    )
}

export default Header