import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
        <h1 className="footer-logo">RentalEase</h1>
          <p>It’s a never-ending battle of making your cars better and also trying to be better yourself.</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-middle">
          <h3>Account</h3>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#">Billing</a>
          <a href="#">Notifications</a>
        </div>

        <div className="footer-middle">
          <h3>About</h3>
          <a href="#">Services</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
          <a href="#">Careers</a>
        </div>

        <div className="footer-right">
          <h3>Company</h3>
          <a href="#">Community</a>
          <a href="#">Help Center</a>
          <a href="#">Support</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2020 All Right Reserved by Carly Rent</p>
        <div className="footer-bottom-links">
          <a href="#">Terms</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
