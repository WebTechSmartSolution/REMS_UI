import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contextAPi/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faTimes,  faList, faPlus, faSearch,
  faUser, faHome, faTasks, faEnvelope, faUserCog,
  faStore, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../style/nav.css';
import authService from "../../services/Auth_JwtApi/AuthService";

const NavbarSidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const { username } = useUser();
  
  const searchRef = useRef(null);
  const userRef = useRef(null);
  
  const toggleSidebar = () => {
    setSidebarActive((prevState) => {
      if (prevState) setOpenDropdown(null);
      return !prevState;
    });
  };
  
  const handleDropdownToggle = (dropdownName) => {
    if (sidebarActive) {
      setOpenDropdown((prevDropdown) =>
        prevDropdown === dropdownName ? null : dropdownName
      );
    }
  };
  
  const handleLogout = () => {
    authService.logout();
  };
  

  return (
    <div className="main3">
      
      {/* Navbar */}
<nav className="custom-navbar1 fixed-top">
  <div className="navbar-container1">
    <button className="hamburger-btn1" onClick={toggleSidebar}>
      <FontAwesomeIcon icon={sidebarActive ? faTimes : faBars} />
    </button>
    <Link className="navbar-brand1" to="/portfolio">Profolio</Link>
    <div className="navbar-links1">
      <Link className="custom-btn1 my-listings1" to="/portfolio/my_all_listings">
        <FontAwesomeIcon icon={faList} /> My Listings
      </Link>
      <Link className="custom-btn1 post-listing1" to="/portfolio/post_listing">
        <FontAwesomeIcon icon={faPlus} /> Post Listing
      </Link>

      {/* Search Icon */}
      <button ref={searchRef} className="custom-btn1 search-btn1" onClick={() => setShowSearchModal(true)}>
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {/* User Profile Icon */}
      <button ref={userRef} className="custom-btn1 user-btn1" onClick={() => setShowUserModal(true)}>
        {username ? username : 'Username'} <FontAwesomeIcon icon={faUser} />
      </button>
    </div>
  </div>
</nav>


      {/* Sidebar */}
      <div id="sidebar1" className={sidebarActive ? 'active1' : ''} >
        <ul className="p-3">
          <li className="active1">
            <Link to="/portfolio/dashboard" onClick={() => setSidebarActive(false)}><FontAwesomeIcon icon={faHome} /><span className="sidebar-text1">Dashboard</span></Link>
          </li>
          <li>
            <Link to="/portfolio/post_listing" onClick={() => setSidebarActive(false)}><FontAwesomeIcon icon={faPlus} /><span className="sidebar-text1">Post Listing</span></Link>
          </li>

         <li>
          <Link to="/portfolio/my_all_listings" onClick={() => setSidebarActive(false)}><FontAwesomeIcon icon={faTasks} /><span className="sidebar-text1">All Listings</span></Link>
          </li>
          <li>
            <Link to="/portfolio/inbox" onClick={() => setSidebarActive(false)}><FontAwesomeIcon icon={faEnvelope} /><span className="sidebar-text1">Inbox</span></Link>
          </li>

          <li>
            <Link to="/portfolio/profile_setting"  onClick={() => setSidebarActive(false)}><FontAwesomeIcon icon={faUserCog} /><span className="sidebar-text1">User Settings</span></Link>
          </li>

          <li>
            <button className="dropdown-toggle1" onClick={() => handleDropdownToggle('propShop')}>
              <FontAwesomeIcon icon={faStore} /><span className="sidebar-text1"> Prop Shop</span>
            </button>
            {openDropdown === 'propShop' && (
              <ul className="collapse1 show">
                <li><Link to="/portfolio/purchase_products"  >Buy Product</Link></li>
                <li><Link to="/portfolio/order_history" >Order History</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      
     {showSearchModal && (
  <div className="modal-overlay" onClick={() => setShowSearchModal(false)}>
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
    >
      <div className="input-wrapper">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          className="form-control"
          placeholder="    Search By ID"
        />
        
      </div>
      <button className="btn btn-primary">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  </div>
)}



      {/* User Profile Modal */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-content1"  onClick={(e) => e.stopPropagation()}>
            <h5>Profile Setting</h5>
            <Link className="btn btn-outline-primary w-100 my-2" to="/portfolio/profile-setting">Account Settings</Link>
            <button className="btn btn-outline-danger w-100 my-2" onClick={handleLogout}>Logout</button>
            {/* <button className="btn btn-secondary w-100 my-2" onClick={() => setShowUserModal(false)}>Close</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarSidebar;
