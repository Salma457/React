import { combineReducers } from "redux";
import myMoviesRed from "./MoviesReducer.js.js";

import favoritesReducer from "./FavoritesReducer.js";

const rootReducer = combineReducers({
  myFavoritesRed: favoritesReducer,
    myMovies:myMoviesRed

});

export default rootReducer;
