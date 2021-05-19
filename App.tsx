import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'

import AppLoading from 'expo-app-loading'
import { useFonts, Roboto_400Regular, Roboto_300Light} from '@expo-google-fonts/roboto'

import Routes from './src/routes'

const App: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_300Light,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store} >
      <Routes/>
    </Provider>
  )
}

export default App
