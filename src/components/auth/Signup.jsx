import React, { useState } from 'react';
import { useSignUpFormValidation } from '../../hooks/authHooks/SignupformValidation_Api';
import { usePassword } from '../../hooks/authHooks/usePassword';
import authService from '../../services/Auth_JwtApi/AuthService'; // Import authService for API calls
import '../../style/Signup.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  // Using custom hooks for form validation and password handling
  const { password, passwordVisible, passwordStrength, togglePasswordVisibility, handlePasswordChange } = usePassword();
  const { validateForm, isSubmitting, setIsSubmitting, errors, setErrors } = useSignUpFormValidation();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [isAgent, setIsAgent] = useState(false);

  // Data object to pass for signup
  const signUpData = {
    name,
    email,
    password,
    mobileNumber: mobile,  // Adjusted field name
    countryCode,
    isAgent,
  };

  // Submission logic directly in SignUp component
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // Validate form fields
    const validationErrors = validateForm(signUpData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    // If validation passes, call the API via authService
    // Call API via authService
    const { status, message } = await authService.signup(signUpData);

    // Toast success or failure based on response from authService
    if (status === 200) {
      toast.success(message);  // Signup successful!
    } else {
      toast.error(message);    // Display appropriate error message
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bdy">
      <div className="signup-container">
        <form
          className="signup-form"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <h2>Sign Up</h2>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* {errors.name && <p className="error-message">{errors.name}</p>} */}

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* {errors.email && <p className="error-message">{errors.email}</p>} */}

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create a strong password"
              required
              minLength="8"
            />
            <span id="toggle-password" className="toggle-password" onClick={togglePasswordVisibility}>
              {passwordVisible ? '🙈' : '👁️'}
            </span>
          </div>
          <div id="password-strength" className={`password-strength ${passwordStrength}`}></div>
          {/* {errors.password && <p className="error-message">{errors.password}</p>} */}

          <label htmlFor="country-code">Mobile Number</label>
          <div className="mobile-container">
            <input
              type="text"
              id="country-code"
              placeholder="+92"
              maxLength="4"
              pattern="\+\d{1,3}"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              required
            />
            <input
              type="text"
              id="mobile"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          {/* {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>} */}

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

          <p className="or">or</p>

          {/* Social login buttons */}
          <div className="social-login">
          <button type="button" className="social-btn fb-btn">
            <svg className='fcb-svg' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
              <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
              <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
            </svg>
            Facebook
          </button>
          <button type="button" className="social-btn google-btn">
            <svg className='google-svg' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Google
          </button>
        </div>


          <div className="login-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
        <ToastContainer />
        {/* Toastify notifications container */}
      </div>
    </div>
  );
};

export default SignUp;
