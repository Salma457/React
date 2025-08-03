const initialState = {
  movies: [],
  loading: false,
  error: null,
};

export default function myMoviesRed(state = initialState, action) {
  switch (action.type) {
    case "MOVIES_LOADING":
      return { ...state, loading: true, error: null };
    case "GET_MOVIES_LIST":
      return { ...state, loading: false, movies: action.payload };
    case "MOVIES_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
