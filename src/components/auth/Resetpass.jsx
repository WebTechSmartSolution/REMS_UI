import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../style/ResetPassword.css'; // Ensure to include your CSS file path

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Add logic for resetting password
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleResetPassword}>
                <h2>Reset your Password</h2>

                <div className="input-group">
                    <label>Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="password-toggle-icon" onClick={handleTogglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>

                <div className="input-group">
                    <label>Confirm Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span className="password-toggle-icon" onClick={handleToggleConfirmPasswordVisibility}>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
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
