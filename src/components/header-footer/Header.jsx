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
    const checkAuthStatus = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      setLoggedIn(isAuthenticated);
    };
    checkAuthStatus();
  }, []);
  
  
  const handleAccountClick = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const onLogout = () => {
    authService.logout();
    setLoggedIn(false); // Update UI after logout
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddPropertyClick = async () => {
    const isAuthenticated = await authService.isAuthenticated();
    if (isAuthenticated) {
      navigate("/portfolio/post_listing");
    } else {
      navigate("/login");
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
              <Link className="Link" to="/all_Listings">
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
                      <Link className="Link" to="/portfolio">
                        Profile
                      </Link>
                      <Link className="Link" to="/portfolio/my_all_listings">
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
                <Link
                 to='/'
                  className="Link"
                  onClick={() => handleScrollToSection("contact-us")}
                >
                  Contact Us
                </Link>
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
          <div className={`sidebar ${sidebarOpen ? "open" : ""}`} >
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
                <Link className="Link" to="/all_Listings">
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
                        <Link className="Link" to="/portfolio">
                          Profile
                        </Link>
                        <Link className="Link" to="/portfolio/my_all_listings">
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
              <Link
                 to='/'
                  className="Link"
                  onClick={() => handleScrollToSection("contact-us")}
                >
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
