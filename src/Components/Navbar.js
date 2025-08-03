import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';

function Navbar() {
    const favorites = useSelector((state) => state.favorites.items);
//   const history = useHistory();
//   const [searchQuery] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       history.push(`/movies?search=${encodeURIComponent(searchQuery)}`);
//     }
//   };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaFilm className="me-2" />
          MovieDB
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
            <Link to="/favorites" className="nav-link position-relative">
  <FaHeart size={20} />
  {favorites.length > 0 && (
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {favorites.length}
    </span>
  )}
</Link>
         </li>
          </ul>
          
       
          
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;