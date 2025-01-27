import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpFormValidation } from '../../hooks/authHooks/SignupformValidation_Api';
import { usePassword } from '../../hooks/authHooks/usePassword';
import authService from '../../services/Auth_JwtApi/AuthService';
import '../../style/Signup.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const { password, passwordVisible, passwordStrength, togglePasswordVisibility, handlePasswordChange } = usePassword();
  const { validateField, validateForm, errors, setErrors, isSubmitting, setIsSubmitting } = useSignUpFormValidation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [isAgent, setIsAgent] = useState(false);

  const signUpData = { name, email, password, mobileNumber: mobile, countryCode, isAgent };
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    if (field === 'name') setName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'mobile') {
      // Allow only numbers and format the input to 11 digits
      const formattedMobile = value.replace(/\D/g, '').slice(0, 11);
      setMobile(formattedMobile);
    } else if (field === 'password') handlePasswordChange({ target: { value } });
  
    const error = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const validationErrors = validateForm(signUpData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      toast.error('Please fill out all required fields correctly.');
      return;
    }

    const { status, message } = await authService.signup(signUpData);
    if (status === 200) {
      toast.success(message);
      setTimeout(() => {
        navigate('/login');
      })
    } else {
      toast.error(message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bdy">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleFormSubmit} noValidate>
          <h2>Sign Up</h2>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              minLength="6"
            />
            <span id="toggle-password" className="toggle-password" onClick={togglePasswordVisibility}>
              {passwordVisible ? '🙈' : '👁️'}
            </span>
          </div>
          <div id="password-strength" className={`password-strength ${passwordStrength}`}></div>
          {errors.password && <p className="error-message">{errors.password}</p>}

          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            required
          />
          {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}

          <label className="checkbox-container">
            <input
              type="checkbox"
              id="agent"
              checked={isAgent}
              onChange={(e) => setIsAgent(e.target.checked)}
            />
            I am an Agent!
          </label>

          <button type="submit" className="register-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
          <div className="login-link">
            <p>Already have an account? <Link className="sign-in-link" to="/login">Sign In</Link></p>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
