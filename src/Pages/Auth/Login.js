import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        setErrEmail(
          value.length === 0
            ? 'Email is required'
            : !/\S+@\S+\.\S+/.test(value) && 'Invalid Email'
        );
        break;
      case 'password':
        setPassword(value);
        setErrPassword(
          value.length === 0
            ? 'Password is required'
            : value.length < 6 && 'Password must be at least 6 characters'
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    if (errEmail || errPassword || !email || !password) {
      e.preventDefault();
    } else {
      // Do login logic here
      alert('Login submitted');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="email" 
            name="email"
            className={`form-control ${errEmail ? 'is-invalid' : email ? 'is-valid' : ''}`}
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
            required 
          />
          <p className="text-danger">{errEmail}</p>
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            name="password"
            className={`form-control ${errPassword ? 'is-invalid' : password ? 'is-valid' : ''}`}
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required 
          />
          <p className="text-danger">{errPassword}</p>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={errEmail || errPassword}
        >
          Login
        </button>
      </form>
      <div className="auth-footer">
        Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
      </div>
    </div>
  );
}

export default Login;
