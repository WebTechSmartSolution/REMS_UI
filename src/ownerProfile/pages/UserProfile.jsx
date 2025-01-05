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
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    phoneNumber: "",
    countryCode: "+92",
    profilePic: null,
  });

  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userIdFromToken = authService.getUserIdFromAuthToken();
        const userData = await authService.fetchUserData(userIdFromToken);

        setUserId(userData.id);
        setFormData((prev) => ({
          ...prev,
          username: userData.name,
          email: userData.email,
          phoneNumber: userData.mobileNumber,
          countryCode: userData.countryCode,
          profilePic: userData.profileImageUrl,
        }));
      } catch (error) {
        notify("error", "Error fetching user data: " + error.message);
      }
    };

    getUserData();
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      notify("error", "Passwords do not match!");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("Name", formData.username);
    formDataToSubmit.append("MobileNumber", formData.phoneNumber);
    formDataToSubmit.append("CountryCode", formData.countryCode);

    if (formData.currentPassword)
      formDataToSubmit.append("CurrentPassword", formData.currentPassword);
    if (formData.newPassword)
      formDataToSubmit.append("NewPassword", formData.newPassword);
    if (formData.profilePic instanceof File)
      formDataToSubmit.append("ProfileImage", formData.profilePic);

    try {
      const response = await authService.updateUserData(
        userId,
        formDataToSubmit
      );
      notify("success", "Profile updated successfully!");

      setFormData((prev) => ({
        ...prev,
        username: response.name,
        phoneNumber: response.mobileNumber,
        countryCode: response.countryCode,
        profilePic: response.profileImageUrl,
      }));
    } catch (error) {
      notify("error", "Failed to update profile: " + error.message);
    }
  };

  return (
    <div className="profile-settings-container">
      <div className="profile-settings">
        <div className="profile-pic-container">
          {formData.profilePic && typeof formData.profilePic === "string" ? (
            <img
              src={`http://localhost:5000${formData.profilePic}`}
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <img
              src="/src/assets/rental1.jpeg"
              alt="Default Profile"
              className="profile-pic"
            />
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
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Current Password"
              className="form-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-visibility"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="password-input-container">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="New Password"
              className="form-input"
            />
          </div>
          <div className="password-input-container">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="form-input"
            />
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
