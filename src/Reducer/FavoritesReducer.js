const initialState = {
  items: [],
};

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const exists = state.items.find((item) => item.id === action.payload.id);
      return {
        ...state,
        items: exists
          ? state.items.filter((item) => item.id !== action.payload.id)
          : [...state.items, action.payload],
      };
    default:
      return state;
  }
}

export const toggleFavorite = (movie) => ({
  type: "TOGGLE_FAVORITE",
  payload: movie,
});
