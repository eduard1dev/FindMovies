import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import StackRoutes from './stack.routes'

import { colors } from '../styles'

const Routes: React.FC = () => {
    return (
        <View style={{flex: 1, backgroundColor: colors.gray_dark}}>
            <NavigationContainer>
                <StackRoutes/>
            </NavigationContainer>
        </View>
    )
}

export default Routes