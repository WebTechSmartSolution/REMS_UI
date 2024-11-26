import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import authService from "../../services/Auth_JwtApi/AuthService";
import { notify } from "../../services/errorHandlingService";

import "../style/Profile.css"; 

const UserProfile = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        profilePic: null,
    });

    useEffect(() => {
        const getUserData = async () => {
          try {
            const userData = await authService.fetchUserData();
            setFormData((prev) => ({
              ...prev,
              ...userData,
            }));
          } catch (error) {
            notify("error", "Error fetching user data: " + error.message);
          }
        };
    
        getUserData();
      }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePic: URL.createObjectURL(file) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            notify("error", "Passwords do not match!");
            return;
        }
        notify("success", "Profile updated successfully!");
    };

    return (
        <div className="profile-settings-container">
            <div className="profile-settings">
                <div className="profile-pic-container">
                    {formData.profilePic ? (
                        <img
                            src={formData.profilePic}
                            alt="Profile"
                            className="profile-pic"
                        />
                    ) : (
                        <div className="placeholder-initials">
                            {formData.username.charAt(0)}
                        </div>
                    )}
                    <label className="upload-label">
                        <input type="file" onChange={handleImageUpload} />
                        <span className="upload-icon">📷</span>
                    </label>
                </div>



                <form onSubmit={handleSubmit} className="profile-form">
                    <h2>Account Information</h2>
                    <p className="form-description">Update your personal details below</p>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        disabled
                        className="form-input form-input-disabled"
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            placeholder="Password"
                            className="form-input"
                        />
                        <button
                            type="button"
                            className="toggle-password-visibility"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className="password-input-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            placeholder="Confirm Password"
                            className="form-input"
                        />
                        <button
                            type="button"
                            className="toggle-password-visibility"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                    <button type="submit" className="form-button1">
                        Save and Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;