import React from 'react'
import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome, faSearch , faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import authservice from '../../services/Auth_JwtApi/AuthService';
import './style/HeroSection.css'

function HeroSection() {
    const [activeOption, setActiveOption] = useState('rent');
    const [formData, setFormData] = useState({
      keyword: '',
      propertyType: '',
      address: '',
      minPrice: '',
      maxPrice: ''
    });
  
    const toggleOption = (option) => {
      setActiveOption(option);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSearch = () => {
      // Check if all fields are filled (you can make this check more strict as required)
      const { keyword, propertyType, address, minPrice, maxPrice } = formData;
      if (!keyword || !propertyType || !address || !minPrice || !maxPrice) {
        alert("Please fill out all fields");
        return;
      }
  
      // Collect all data including activeOption (buy or rent)
      const searchData = {
        ...formData,
        searchType: activeOption
      };
  
      // Make an API call to AuthService
      authservice.searchProperties(searchData)
        .then(response => {
          console.log("API Response: ", response);
        })
        .catch(error => {
          console.error("Error during API call: ", error);
        });
    };
  
    return (
        <>
        <section>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Best Dream House for Rental, Buy & Sell...</h1>
          <p>Property finds by meeting your location. With more than 2000+ listings for you to choose from</p>
  
          {/* Buttons for Rent/Buy with Icons */}
          <div className="toggle-buttons">
            <div className="toggle-btns">
              <button 
                className={`toggle-btn ${activeOption === 'rent' ? 'active' : ''}`} 
                onClick={() => toggleOption('rent')}
              >
                <FontAwesomeIcon icon={faHome} /> Rent Property
              </button>
              <button 
                className={`toggle-btn ${activeOption === 'buy' ? 'active' : ''}`} 
                onClick={() => toggleOption('buy')}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Buy Property
              </button>
            </div>
          </div>
  
          {/* Search Box Container with Border */}
          <div className="search-box-container">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Enter Keyword" 
                name="keyword"
                className="search-input" 
                value={formData.keyword}
                onChange={handleInputChange} 
              />
              <select 
                className="property-type" 
                name="propertyType" 
                value={formData.propertyType} 
                onChange={handleInputChange}
              >
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
              <input 
                type="text" 
                placeholder="Enter Address" 
                name="address"
                className="search-input" 
                value={formData.address}
                onChange={handleInputChange} 
              />
              <input 
                type="number" 
                placeholder="Min Price" 
                name="minPrice"
                className="search-input" 
                value={formData.minPrice}
                onChange={handleInputChange} 
              />
              <input 
                type="number" 
                placeholder="Max Price" 
                name="maxPrice"
                className="search-input" 
                value={formData.maxPrice}
                onChange={handleInputChange} 
              />
              <button className="search-btn" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} /> 
              </button>
            </div>
          </div>
        </div>
      </div>
      </section>
     
      </>
    );
  }


export default HeroSection