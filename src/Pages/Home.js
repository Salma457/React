import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaPlay, FaSearch, FaHeart, FaRegHeart, FaFilter, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../src/api/axios';
import './MoviesList/HomePage.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'popularity.desc',
    year: '',
    genre: '',
    rating: ''
  });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  // Fetch genres
  const fetchGenres = useCallback(async () => {
    try {
      const response = await api.get('/genre/movie/list');
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
      toast.error('Failed to load genres');
    }
  }, []);

  // Fetch trending movies for hero section
  const fetchTrending = useCallback(async () => {
    try {
      const response = await api.get('/trending/movie/week');
      setTrendingMovies(response.data.results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      toast.error('Failed to load trending movies');
    }
  }, []);

  // Fetch movies based on filters/search
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = '/discover/movie';
      const params = {
        sort_by: filters.sortBy,
        page: 1
      };

      if (filters.year) {
        params.primary_release_year = filters.year;
      }

      if (filters.genre) {
        params.with_genres = filters.genre;
      }

      if (filters.rating) {
        params['vote_average.gte'] = filters.rating;
      }

      if (searchQuery) {
        endpoint = '/search/movie';
        params.query = searchQuery;
      }

      const response = await api.get(endpoint, { params });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast.error('Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery]);

  useEffect(() => {
    fetchGenres();
    fetchTrending();
  }, [fetchGenres, fetchTrending]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchMovies]);

  // Auto-rotate hero slides
  useEffect(() => {
    if (trendingMovies.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % trendingMovies.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [trendingMovies]);

  const isFavorite = useCallback((movie) => 
    favorites.some((item) => item.id === movie.id), 
    [favorites]
  );

  const handleFavorite = useCallback((movie) => {
    if (isFavorite(movie)) {
      setFavorites(favorites.filter((item) => item.id !== movie.id));
      toast.success(`"${movie.title}" removed from favorites.`);
    } else {
      setFavorites([...favorites, movie]);
      toast.success(`"${movie.title}" added to favorites.`);
    }
  }, [favorites, isFavorite]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  const featuredMovie = trendingMovies[activeSlide] || {};

  return (
    <div className="home-container">
      {/* Hero Section */}
      {trendingMovies.length > 0 && (
        <section className="hero-section">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="hero-backdrop"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(3, 7, 18, 0.9) 0%, rgba(3, 7, 18, 0.3) 100%), url(${
                  featuredMovie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
                    : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'
                })`,
              }}
            >
              <div className="hero-content">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="hero-text"
                >
                  <h1 className="hero-title">{featuredMovie.title}</h1>
                  <div className="hero-meta">
                    <span className="hero-rating">
                      <FaStar className="star-icon" />
                      {featuredMovie.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                    <span className="hero-year">
                      <FaCalendarAlt className="meta-icon" />
                      {formatDate(featuredMovie.release_date)}
                    </span>
                  </div>
                  <p className="hero-overview">
                    {featuredMovie.overview || 'No overview available'}
                  </p>
                  <div className="hero-actions">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="play-button"
                    >
                      <FaPlay /> Watch Trailer
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="favorite-button"
                      onClick={() => handleFavorite(featuredMovie)}
                    >
                      {isFavorite(featuredMovie) ? (
                        <FaHeart color="#e63946" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="hero-indicators">
            {trendingMovies.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Search and Filters */}
        <div className="controls">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="filter-icon" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div 
            className="filters-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-section">
              <h3 className="filter-title">Filter Movies</h3>
              
              <div className="filter-row">
                <div className="filter-group">
                  <label className="filter-label">Sort By</label>
                  <div className="select-wrapper">
                    <select
                      name="sortBy"
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
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
                    onChange={(e) => setFilters({...filters, year: e.target.value})}
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
                      onChange={(e) => setFilters({...filters, genre: e.target.value})}
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
                      onChange={(e) => setFilters({...filters, rating: e.target.value})}
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
                  onClick={() => setFilters({
                    sortBy: 'popularity.desc',
                    year: '',
                    genre: '',
                    rating: ''
                  })}
                >
                  Reset All
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Movies Grid */}
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
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -10 }}
                  className="movie-card"
                >
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
                        e.target.src =
                          'https://via.placeholder.com/500x750?text=No+Poster';
                      }}
                    />
                    <div className="movie-overlay">
                      <div className="movie-rating">
                        <FaStar className="star-icon" />
                        <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                      </div>
                      <button
                        className="favorite-button"
                        onClick={() => handleFavorite(movie)}
                      >
                        {isFavorite(movie) ? (
                          <FaHeart color="#e63946" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-year">
                      {formatDate(movie.release_date)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Categories Section */}
            <section className="categories-section">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Browse by Category
              </motion.h2>
              <div className="categories-grid">
                {genres.slice(0, 6).map((genre, index) => (
                  <motion.div
                    key={genre.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="category-card"
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                    onClick={() => {
                      setFilters({...filters, genre: genre.id});
                      setShowFilters(false);
                    }}
                  >
                    <h3>{genre.name}</h3>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default Home;