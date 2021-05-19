import { configureStore } from '@reduxjs/toolkit'

import MoviesWatchLaterReducer from './MoviesWatchLater.store'


const store = configureStore({
    reducer: {
        moviesWatchLater: MoviesWatchLaterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store