import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.items.find(item => item.id === movie.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== movie.id);
      } else {
        state.items.push(movie);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
