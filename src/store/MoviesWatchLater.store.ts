import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface moviesWatchLaterState {
    moviesWatchLater: string[]
}

const initialState: moviesWatchLaterState = {
    moviesWatchLater: []
}   

const moviesWatchLaterSlice = createSlice({
    name: 'moviesWatchLater',

    initialState,

    reducers: {
        toogleIncrement:  (state, action: PayloadAction<string>) => {
            if(state.moviesWatchLater.includes(action.payload)){
                state.moviesWatchLater.splice(state.moviesWatchLater.indexOf(action.payload), 1)
                return 
            }
            state.moviesWatchLater.push(action.payload)
        }
    }
})

export const { toogleIncrement } = moviesWatchLaterSlice.actions
export default moviesWatchLaterSlice.reducer