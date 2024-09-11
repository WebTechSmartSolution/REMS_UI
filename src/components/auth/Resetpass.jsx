import React, { useState } from 'react';
import AuthService from '../../services/Auth_JwtApi/AuthService'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import '../../style/ResetPassword.css'; // Optional: Add a CSS file for styling

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");  // Toastify alert
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (!token) {
            toast.error("Invalid or missing token!");  // Toastify alert
            return;
        }

        AuthService.resetPassword({ token, password })
            .then(response => {
                toast.success("Password reset successful!");  // Toastify alert
                setTimeout(() => {
                    window.location.href = '/login';  // Redirect after a short delay
                }, 2000);  // Redirect after 2 seconds
            })
            .catch(error => {
                toast.error("Password reset failed: " + (error.response?.data?.message || "Unknown error"));  // Toastify alert
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="reset-password-container">
            <ToastContainer />  {/* Toastify container for displaying alerts */}
            <form className="reset-password-form" onSubmit={handleResetPassword}>
                <h2>Reset your Password</h2>

                <div className="input-group">
                    <label>Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>

                <div className="input-group">
                    <label>Confirm Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={confirmPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={confirmPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>

                <button type="submit" className="reset-password-btn">Reset Password</button>

                <Link to="/login" className="return-to-login">Return to Log In</Link>
            </form>
        </div>
    );
};

export default ResetPassword;
