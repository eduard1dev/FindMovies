import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import request from '../../services/api';

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

const useHome = () => {
  const [genreSelected, setGenreSelected] = useState<string>('0');
  const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);

  const getGenres = () =>
    request({
      url: '3/genre/movie/list?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US',
      method: 'GET',
    });

  const getMovies = () =>
    request({
      url: '3/movie/popular?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US&page=1',
      method: 'GET',
    });

  const genres = useQuery(['genres'], getGenres);
  const movies = useQuery(['movies'], getMovies, {
    onSuccess: ({ results }: { results: MovieProps[] }) => {
      setFilteredMovies(results);
    },
  });

  function handleGenreSelected(genreId: string) {
    if (genreSelected === genreId) {
      setGenreSelected('0');
      setFilteredMovies(movies.data!.results);
    } else {
      const filtered = movies.data!.results.filter((movie: MovieProps) =>
        movie.genre_ids.includes(genreId),
      );
      setFilteredMovies(filtered);
      setGenreSelected(genreId);
    }
  }

  function handleMovieSelected(movie: MovieProps, navigation: any) {
    let firstMovieGenre = 'No Genre';
    genres.data.genres.forEach((element: GenresProps) => {
      if (element.id === movie.genre_ids[0]) {
        firstMovieGenre = element.name;
      }
    });

    navigation.navigate('Details', { movie, firstMovieGenre });
  }

  return {
    filteredMovies,
    genres,
    handleMovieSelected,
    handleGenreSelected,
    genreSelected,
    movies,
  };
};

export default useHome;
