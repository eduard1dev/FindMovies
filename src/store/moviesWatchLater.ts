import { StateCreator } from "zustand";
import produce from "immer";

export type MovieProps = number;

export interface MoviesWatchLaterStateProps {
  moviesWatchLater: MovieProps[];
  setMoviesWatchLater: (movie: MovieProps) => void;
}

export const createMoviesWatchLaterSlice: StateCreator<
  MoviesWatchLaterStateProps
> = (set) => ({
  moviesWatchLater: [],
  setMoviesWatchLater: (movie) =>
    set(
      produce((state: MoviesWatchLaterStateProps) => {
        if (state.moviesWatchLater.indexOf(movie) > -1) {
          state.moviesWatchLater.splice(
            state.moviesWatchLater.indexOf(movie),
            1
          );
        } else {
          state.moviesWatchLater.push(movie);
        }
      })
    ),
});
