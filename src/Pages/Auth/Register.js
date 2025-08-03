import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errFullName, setErrFullName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errConfirmPassword, setErrConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'fullName':
        setFullName(value);
        setErrFullName(
          value.length === 0
            ? 'Full Name is required'
            : value.length < 3 && 'Full Name must be at least 3 characters'
        );
        break;
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
      case 'confirmPassword':
        setConfirmPassword(value);
        setErrConfirmPassword(
          value.length === 0
            ? 'Please confirm your password'
            : value !== password && 'Passwords do not match'
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    if (
      errFullName ||
      errEmail ||
      errPassword ||
      errConfirmPassword ||
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      e.preventDefault();
    } else {
      // Send form (can add API here)
      alert('Form submitted');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text" 
            className={`form-control ${errFullName ? 'is-invalid' : fullName ? 'is-valid' : ''}`}
            placeholder="Full Name"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            required 
          />
          <p className="text-danger">{errFullName}</p>
        </div>
        <div className="mb-3">
          <input 
            type="email" 
            className={`form-control ${errEmail ? 'is-invalid' : email ? 'is-valid' : ''}`}
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required 
          />
          <p className="text-danger">{errEmail}</p>
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className={`form-control ${errPassword ? 'is-invalid' : password ? 'is-valid' : ''}`}
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required 
          />
          <p className="text-danger">{errPassword}</p>
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className={`form-control ${errConfirmPassword ? 'is-invalid' : confirmPassword ? 'is-valid' : ''}`}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required 
          />
          <p className="text-danger">{errConfirmPassword}</p>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={
            errFullName ||
            errEmail ||
            errPassword ||
            errConfirmPassword
          }
        >
          Register
        </button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link to="/login" className="auth-link">Login here</Link>
      </div>
    </div>
  );
}

export default Register;
