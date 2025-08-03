import axios from "axios";

// Action Creator with Thunk
export const getMoviesList = (category = "popular") => {
  return async (dispatch) => {
    try {
      dispatch({ type: "MOVIES_LOADING" });

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=29cf44b93ca83bf48d9356395476f7ad`
      );

      dispatch({
        type: "GET_MOVIES_LIST",
        payload: res.data.results,
      });
    } catch (error) {
      dispatch({
        type: "MOVIES_ERROR",
        payload: error.message,
      });
    }
  };
};
