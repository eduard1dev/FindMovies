import { useEffect, useState, useRef } from 'react';

import Api from '../services/api';

interface GenresProps {
  id: string;
  name: string;
}

export interface MovieProps {
  backdrop_path: string;
  genre_ids: string[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: string;
  adult: string;
}

const useGetMovies = () => {
  const [genres, setGenres] = useState<GenresProps[]>([]);
  const [genreSelected, setGenreSelected] = useState<string>();
  const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);

  let movies: MovieProps[] = [];

  async function fetchGenres() {
    const { data } = await Api.get(
      '3/genre/movie/list?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US',
    );
    setGenres(data.genres);
  }

  async function fetchMovies() {
    const { data } = await Api.get(
      '3/movie/popular?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US&page=1',
    );
    movies = data.results;
    setFilteredMovies(data.results);
  }

  function handleGenreSelected(genreId: string) {
    if (genreSelected === genreId) {
      setGenreSelected('0');
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.genre_ids.includes(genreId),
      );
      setFilteredMovies(filtered);
      setGenreSelected(genreId);
    }
  }

  function handleMovieSelected(movie: MovieProps, navigation: any) {
    let firstMovieGenre = 'No Genre';
    genres.forEach((element) => {
      if (element.id === movie.genre_ids[0]) {
        firstMovieGenre = element.name;
      }
    });

    navigation.navigate('Details', { movie, firstMovieGenre });
  }

  return {
    fetchMovies,
    fetchGenres,
    filteredMovies,
    genres,
    handleMovieSelected,
    handleGenreSelected,
    genreSelected,
  };
};

export default useGetMovies;
