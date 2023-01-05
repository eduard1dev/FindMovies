import create from "zustand";
import { createUserSlice, UserStateProps } from "./user";
import {
  createMoviesWatchLaterSlice,
  MoviesWatchLaterStateProps,
} from "./moviesWatchLater";

export const useGlobalStore = create<
  UserStateProps & MoviesWatchLaterStateProps
>((...a) => ({
  ...createUserSlice(...a),
  ...createMoviesWatchLaterSlice(...a),
}));
