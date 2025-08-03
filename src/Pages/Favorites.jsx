// Favorites.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../Redux/favoritesSlice';
import { FaHeart } from 'react-icons/fa';
import './Favorites.css'; 

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  return (
    <div className="favorites-container">
      <h2>Your Favorite Movies</h2>

      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <div className="movie-poster-container">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=No+Poster'
                    }
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-actions">
                    <button
                      className="favorite-button"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleFavorite(movie));
                      }}
                    >
                      <FaHeart color="#e63946" />
                    </button>
                  </div>
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-overview">
                    {movie.overview
                      ? `${movie.overview.substring(0, 100)}...`
                      : 'No overview available'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
