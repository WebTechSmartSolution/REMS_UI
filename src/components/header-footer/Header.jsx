import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlusCircle,
  faUserPlus,
  faSignInAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../style/Header.css";
import authService from "../../services/Auth_JwtApi/AuthService"; // Import your authService
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Will be replaced with authService
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in using authService
    setLoggedIn(authService.isAuthenticated());
  }, []);

  const handleAccountClick = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const onLogout = () => {
    authService.logout(); // Logout using authService
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddPropertyClick = () => {
    if (authService.isAuthenticated()) {
      // Redirect to add listing page if logged in
      window.location.href = "/add-listing";
    } else {
      // Redirect to login page if not logged in
      window.location.href = "/login";
    }
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // Redirect to login page
  const handleSignInClick = () => {
    navigate("/login");
  };
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth'  });
    }
};

  return (
    <>
      <header>
        <nav className="navbar1">
          <div className="hamburger1" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className="logo">
            <h2 className="logo">
              <Link className="Link" to="/">
                RentalEase
              </Link>
            </h2>
          </div>

          <ul className="nav-links">
            <li>
              <Link className="Link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="Link" to="/All_Listings">
                Listing
              </Link>
            </li>
            <li>
              <Link
              to='/'
                className="Link"
                onClick={() => handleScrollToSection("Our-Partners")}
              >
                Agent
              </Link>
            </li>
            <li className="dropdown">
              {loggedIn ? (
                <>
                  <span onClick={handleAccountClick} className="dropbtn">
                    My Account
                  </span>
                  {dropdownOpen && (
                    <div className="dropdown-content">
                      <Link className="Link" to="/Profile">
                        Profile
                      </Link>
                      <Link className="Link" to="/Profile/My-Listing">
                        Your Listings
                      </Link>
                      <Link className="Link" to="/login" onClick={onLogout}>
                        Logout
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="dropbtn">
                  My Account
                </Link>
              )}
            </li>
            <li>
              <li>
                <Link
                 to='/'
                  className="Link"
                  onClick={() => handleScrollToSection("contact-us")}
                >
                  Contact Us
                </Link>
              </li>
            </li>
          </ul>
          <div className="auth-buttons">
            <button className="add-property" onClick={handleAddPropertyClick}>
              <FontAwesomeIcon icon={faPlusCircle} /> Add New Property
            </button>
            {!loggedIn && (
              <>
                <button className="sign-up" onClick={handleSignUpClick}>
                  <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                </button>
                <button className="sign-in" onClick={handleSignInClick}>
                  <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                </button>
              </>
            )}
          </div>
        </nav>
        <div className="Sidebar_Display">
          <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="close-btn" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <ul>
              <li>
                <Link className="Link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="Link" to="/">
                  Listing
                </Link>
              </li>
              <li>
                <Link className="Link" to="/">
                  Agent
                </Link>
              </li>
              <li className="dropdown">
                {loggedIn ? (
                  <>
                    <span onClick={handleAccountClick} className="dropbtn">
                      My Account
                    </span>
                    {dropdownOpen && (
                      <div className="dropdown-content">
                        <Link className="Link" to="/">
                          Profile
                        </Link>
                        <Link className="Link" to="/">
                          Your Listings
                        </Link>
                        <Link className="Link" to="/" onClick={onLogout}>
                          Logout
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="dropbtn">
                    My Account
                  </Link>
                )}
              </li>
              <li>
                <Link className="Link" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="Link" to="/" onClick={handleAddPropertyClick}>
                  Add New Property
                </Link>
              </li>
              {!loggedIn && (
                <>
                  <li>
                    <Link className="Link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to="/login">
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
