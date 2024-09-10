import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlusCircle, faUserPlus, faSignInAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../style/Header.css';
import authService from '../../services/Auth_JwtApi/AuthService'; // Import your authService

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // Will be replaced with authService
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in using authService
        setLoggedIn(authService.isAuthenticated());
    }, []);

    const handleAccountClick = () => {
        setDropdownOpen(prevState => !prevState);
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
            window.location.href = '/add-listing';
        } else {
            // Redirect to login page if not logged in
            window.location.href = '/login';
        }
    };

    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="hamburger" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className="logo">
                        <h2 className="logo">RentalEase</h2>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Listing</a></li>
                        <li><a href="#">Agent</a></li>
                        <li className="dropdown">
                            {loggedIn ? (
                                <>
                                    <span onClick={handleAccountClick} className="dropbtn">My Account</span>
                                    {dropdownOpen && (
                                        <div className="dropdown-content">
                                            <a href="#">Profile</a>
                                            <a href="#">Your Listings</a>
                                            <a href="#" onClick={onLogout}>Logout</a>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <a href="/login" className="dropbtn">My Account</a>
                            )}
                        </li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                    <div className="auth-buttons">
                        <button className="add-property" onClick={handleAddPropertyClick}>
                            <FontAwesomeIcon icon={faPlusCircle} /> Add New Property
                        </button>
                        {!loggedIn && (
                            <>
                                <button className="sign-up">
                                    <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                                </button>
                                <button className="sign-in">
                                    <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                                </button>
                            </>
                        )}
                    </div>
                </nav>
                <div className="Sidebar_Display">
                    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                        <div className="close-btn" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Listing</a></li>
                            <li><a href="#">Agent</a></li>
                            <li className="dropdown">
                                {loggedIn ? (
                                    <>
                                        <span onClick={handleAccountClick} className="dropbtn">My Account</span>
                                        {dropdownOpen && (
                                            <div className="dropdown-content">
                                                <a href="#">Profile</a>
                                                <a href="#">Your Listings</a>
                                                <a href="#" onClick={onLogout}>Logout</a>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <a href="/login" className="dropbtn">My Account</a>
                                )}
                            </li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#" onClick={handleAddPropertyClick}>
                                Add New Property
                            </a></li>
                            {!loggedIn && (
                                <>
                                    <li><a href="#">Sign Up</a></li>
                                    <li><a href="#">Sign In</a></li>
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
