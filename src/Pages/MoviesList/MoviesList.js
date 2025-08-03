import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaSearch, FaCalendarAlt, FaFilter, FaHeart, FaRegHeart, FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../Redux/favoritesSlice';
import { fetchMovies, setSearchQuery, setCurrentPage, setFilters, resetFilters } from '../../Redux/moviesSlice';
import Pagination from '../../Components/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MoviesList.css';

function MoviesList() {
  const dispatch = useDispatch();
  const {
    items: movies,
    loading,
    currentPage,
    totalPages,
    searchQuery,
    filters
  } = useSelector((state) => state.movies);
  
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = (movie) => favorites.some((item) => item.id === movie.id);
  const [showFilters, setShowFilters] = React.useState(false);

  useEffect(() => {
    dispatch(fetchMovies({ searchQuery, currentPage, filters }));
  }, [dispatch, currentPage, searchQuery, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({
      ...filters,
      [name]: value
    }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h2>{searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}</h2>
        
        <div className="controls">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
              <button className="search-button" type="submit">
                Search
              </button>
            </div>
          </form>

          {!searchQuery && (
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="filter-icon" />
              Filters
            </button>
          )}
        </div>

        {showFilters && !searchQuery && (
          <div className="filters-container">
            <div className="filter-section">
              <h3 className="filter-title">Filter Movies</h3>
              
              <div className="filter-row">
                <div className="filter-group">
                  <label className="filter-label">Sort By</label>
                  <div className="select-wrapper">
                    <select
                      name="sortBy"
                      value={filters.sortBy}
                      onChange={handleFilterChange}
                      className="filter-select"
                    >
                      <option value="popularity.desc">Popular (High to Low)</option>
                      <option value="popularity.asc">Popular (Low to High)</option>
                      <option value="vote_average.desc">Rating (High to Low)</option>
                      <option value="vote_average.asc">Rating (Low to High)</option>
                      <option value="release_date.desc">Newest First</option>
                      <option value="release_date.asc">Oldest First</option>
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Release Year</label>
                  <input
                    type="number"
                    name="year"
                    placeholder="All Years"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                </div>
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label className="filter-label">Genre</label>
                  <div className="select-wrapper">
                    <select
                      name="genre"
                      value={filters.genre}
                      onChange={handleFilterChange}
                      className="filter-select"
                    >
                      <option value="">All Genres</option>
                      {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Min Rating</label>
                  <div className="select-wrapper">
                    <select
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                      className="filter-select"
                    >
                      <option value="">Any Rating</option>
                      <option value="7">7+ Stars</option>
                      <option value="8">8+ Stars</option>
                      <option value="9">9+ Stars</option>
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                </div>
              </div>

              <div className="filter-actions">
                <button 
                  className="apply-filters"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
                <button 
                  className="reset-filters"
                  onClick={handleResetFilters}
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="no-results">
          <h3>No movies found</h3>
          <p>Try adjusting your filters or search term</p>
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`} className="movie-link">
                  <div className="movie-poster-container">
                    <img
                      src={
                        movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://via.placeholder.com/500x750?text=No+Poster'
                      }
                      className="movie-poster"
                      alt={movie.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                      }}
                    />
                    <div className="movie-rating">
                      <FaStar className="star-icon" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="movie-actions">
                      <button
                        className="favorite-button"
                        onClick={(e) => {
                          e.preventDefault(); 
                          dispatch(toggleFavorite(movie));
                          const message = isFavorite(movie)
                            ? `"${movie.title}" removed from favorites.`
                            : `"${movie.title}" added to favorites.`;
                          toast.success(message);
                        }}
                      >
                        {isFavorite(movie) ? <FaHeart color="#e63946" /> : <FaRegHeart />}
                      </button>
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-meta">
                      <span className="movie-year">
                        <FaCalendarAlt className="meta-icon" />
                        {formatDate(movie.release_date)}
                      </span>
                      {movie.vote_count > 0 && (
                        <span className="movie-votes">
                          ({movie.vote_count.toLocaleString()} votes)
                        </span>
                      )}
                    </div>
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

          {totalPages > 1 && (
            <div className="pagination-container">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => dispatch(setCurrentPage(page))}
              />
            </div>
          )}
        </>
      )}
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default MoviesList;