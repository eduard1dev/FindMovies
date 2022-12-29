import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./User.store";
import MoviesWatchLaterReducer from "./MoviesWatchLater.store";

const store = configureStore({
  reducer: {
    moviesWatchLater: MoviesWatchLaterReducer,
    user: UserReducer,
  },
});

export type RootStateProps = ReturnType<typeof store.getState>;
export type AppDispatchProps = typeof store.dispatch;

export default store;
