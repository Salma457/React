import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../../api/movies';
import { FaStar, FaClock, FaCalendarAlt, FaLanguage, FaMoneyBillWave, FaImdb } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { MdOutlineDateRange, MdLanguage } from 'react-icons/md';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await getMovieDetails(id);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const formatCurrency = (amount) => {
    return amount ? new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount) : 'N/A';
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="not-found-container">
        <h2>Movie not found</h2>
        <Link to="/movies" className="back-button">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-details">
      {/* Hero Section with Backdrop */}
      <div 
        className="movie-hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 20, 0.3), rgba(10, 10, 20, 0.95)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
        }}
      >
        <div className="container hero-content">
          <div className="movie-poster-container">
            <img
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              className="movie-poster"
              alt={movie.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
              }}
            />
          </div>
          <div className="movie-header">
            <h1 className="movie-title">
              {movie.title} 
              {movie.release_date && (
                <span className="release-year">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </h1>
            
            <div className="movie-meta">
              <div className="meta-item rating">
                <FaStar className="meta-icon" />
                <span>{movie.vote_average.toFixed(1)}/10</span>
                <span className="vote-count">({movie.vote_count.toLocaleString()} votes)</span>
              </div>
              
              {movie.runtime && (
                <div className="meta-item">
                  <IoMdTime className="meta-icon" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
              
              {movie.release_date && (
                <div className="meta-item">
                  <MdOutlineDateRange className="meta-icon" />
                  <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                </div>
              )}
              
              {movie.original_language && (
                <div className="meta-item">
                  <MdLanguage className="meta-icon" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              )}
            </div>
            
            <div className="genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="action-buttons">
              <button className="watch-trailer">
                Watch Trailer
              </button>
              <button className="add-favorite">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container movie-main-content">
        <div className="row">
          <div className="col-lg-8">
            {/* Overview Section */}
            <section className="movie-section">
              <h2 className="section-title">Overview</h2>
              <p className="movie-overview">{movie.overview}</p>
            </section>

            {/* Additional Details */}
            <div className="details-grid">
              {movie.budget > 0 && (
                <div className="detail-card">
                  <FaMoneyBillWave className="detail-icon" />
                  <div>
                    <h3>Budget</h3>
                    <p>{formatCurrency(movie.budget)}</p>
                  </div>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div className="detail-card">
                  <FaMoneyBillWave className="detail-icon" />
                  <div>
                    <h3>Revenue</h3>
                    <p>{formatCurrency(movie.revenue)}</p>
                  </div>
                </div>
              )}
              
              {movie.status && (
                <div className="detail-card">
                  <FaCalendarAlt className="detail-icon" />
                  <div>
                    <h3>Status</h3>
                    <p>{movie.status}</p>
                  </div>
                </div>
              )}
              
              {movie.imdb_id && (
                <div className="detail-card">
                  <FaImdb className="detail-icon" />
                  <div>
                    <h3>IMDb</h3>
                    <a 
                      href={`https://www.imdb.com/title/${movie.imdb_id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on IMDb
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <section className="movie-section">
                <h2 className="section-title">Production Companies</h2>
                <div className="companies-grid">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="company-card">
                      {company.logo_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} 
                          alt={company.name}
                          className="company-logo"
                        />
                      ) : (
                        <div className="company-name">{company.name}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="col-lg-4">
            {/* Sidebar with additional info */}
            <div className="movie-sidebar">
              {movie.tagline && (
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Tagline</h3>
                  <p className="tagline">"{movie.tagline}"</p>
                </div>
              )}
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Original Title</h3>
                <p>{movie.original_title}</p>
              </div>
              
              {movie.spoken_languages.length > 0 && (
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Spoken Languages</h3>
                  <div className="languages-list">
                    {movie.spoken_languages.map(lang => (
                      <span key={lang.iso_639_1} className="language-tag">
                        {lang.english_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {movie.production_countries.length > 0 && (
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Production Countries</h3>
                  <div className="countries-list">
                    {movie.production_countries.map(country => (
                      <span key={country.iso_3166_1} className="country-tag">
                        {country.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;