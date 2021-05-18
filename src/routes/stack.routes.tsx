import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../pages/Home'
import Details from '../pages/Details'


const Stack = createStackNavigator()

const StackRoutes: React.FC = () => {
    return (
        <Stack.Navigator  
            screenOptions = {{
                headerShown: false
            }}
        >
            <Stack.Screen component={Home} name='Home'/>
            <Stack.Screen component={Details} name='Details'/>
        </Stack.Navigator>
    )
}

export default StackRoutes