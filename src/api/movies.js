// src/api/movies.js
import api from './axios';

export const getPopularMovies = (page = 1) => {
  return api.get('/movie/popular', {
    params: { page }
  });
};

export const getMovieDetails = (movieId) => {
  return api.get(`/movie/${movieId}`);
};

export const searchMovies = (query, page = 1) => {
  return api.get('/search/movie', {
    params: { query, page }
  });
};

export const discoverMovies = (params = {}) => {
  return api.get('/discover/movie', {
    params: {
      sort_by: 'popularity.desc',
      ...params
    }
  });
};