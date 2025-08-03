import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// جلب الأفلام باستخدام createAsyncThunk
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ searchQuery, currentPage, filters }, thunkAPI) => {
    try {
      const params = {
        page: currentPage,
        query: searchQuery,
        sort_by: filters.sortBy || 'popularity.desc',
        primary_release_year: filters.year || '',
        with_genres: filters.genre || '',
        'vote_average.gte': filters.rating || '',
        api_key: '29cf44b93ca83bf48d9356395476f7ad',
        language: 'en-US'
      };

      const endpoint = searchQuery
        ? 'https://api.themoviedb.org/3/search/movie'
        : 'https://api.themoviedb.org/3/discover/movie';

      const response = await axios.get(endpoint, { params });

      return {
        movies: response.data.results,
        totalPages: response.data.total_pages
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    loading: false,
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
    filters: {
      sortBy: 'popularity.desc',
      year: '',
      genre: '',
      rating: ''
    }
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        sortBy: 'popularity.desc',
        year: '',
        genre: '',
        rating: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.movies;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.items = [];
      });
  }
});

export const {
  setSearchQuery,
  setCurrentPage,
  setFilters,
  resetFilters
} = moviesSlice.actions;

export default moviesSlice.reducer;
