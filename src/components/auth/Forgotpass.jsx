import React, { useState } from 'react';
import '../../style/Forgotpass.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthService from '../../services/Auth_JwtApi/AuthService'; // Adjust the path based on your project structure
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await AuthService.forgotPassword(email);
      toast.success(response.message || 'Password reset link sent. Please check your email.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='bdy'>
      <div className="forgot-password-container">
        <div className="back-home">
          <Link to="/">
            <span>↩</span> Back To Home
          </Link>
        </div>
<span className='titile'>Forgot Password</span>
        

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <div className="input-container">
            <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Requesting....' : 'Submit'}
          </button>
         
        </form>

        <div className="login-link">
          <p>
            Remember login? <Link to="/login" className="sign-in-link">Sign In</Link>
          </p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ForgotPassword;
