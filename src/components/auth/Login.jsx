import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Login.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import authService from '../../services/Auth_JwtApi/AuthService';
import { toast } from 'react-toastify';
import {notify} from '../../services/errorHandlingService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation (example: at least 6 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const { status, message } = await authService.login(email, password);
      if (status === 200) {
        notify('success', 'Login Successful!');
        setTimeout(() => {
          window.location.href = '/';  // Redirect after a short delay
        }, 3000);
      } else if (status === 400) {
        toast.error(message);
      } else if (status === 401) {
        toast.error('Email and password not found');
      }
    } catch (err) {
      if(err.message == null){
        toast.error('error'+err.response.data.message);
      }else{
        toast.error('Network Error Server Not found');
      }
      // toast.error(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='bdy'>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
         
          <form className='login-form' onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="input-box">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                autoComplete="false"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box password-box">
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                id="togglePassword"
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            </div>
            <div className="options">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to = "/Forgot-Password">Forgot Password?</Link>
              
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
