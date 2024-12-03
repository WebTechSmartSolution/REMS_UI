import React from 'react'
import  { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome, faSearch , faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import authservice from '../../services/Auth_JwtApi/AuthService';
import { notify } from '../../services/errorHandlingService';
import './style/HeroSection.css'

function HeroSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
 
    const [activeOption, setActiveOption] = useState('rent');
    const [formData, setFormData] = useState({
      keyword: '',
      propertyType: '',
      address: '',
      minPrice: '',
      maxPrice: ''
    });
    const words = ["Rent...","Buy...","Sale..."];
    const speed = 180; // Typing speed in milliseconds

    useEffect(() => {
      const handleTyping = () => {
        const currentWord = words[wordIndex];
        if (!isDeleting) {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
          if (charIndex + 1 === currentWord.length) {
            setIsDeleting(true);
          }
        } else {
          setText(currentWord.substring(0, charIndex));
          setCharIndex((prev) => prev - 1);
          if (charIndex === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      };
  
      const typingInterval = setInterval(handleTyping, speed);
  
      return () => clearInterval(typingInterval);
    }, [charIndex, isDeleting, wordIndex, words]);
  
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
        notify("error","Please fill out all fields");
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
          
          notify("error","Error during API call: " + error.message);
        });
    };
  
    return (
        <>
        <section>
      <div className="hero_section">
        <div className="hero_content">
        {/* <h1>
      Find Your Best Dream House For{" "}
      <span style={{ color: color }}>{currentWord}</span>
    </h1> */}
          <div className="here_right_text">
            {/* //  <h1>Smart <span>Parking</span> Smart <span>Solution</span></h1>  */}
            <h1>Find Your Dream House Anywhere For <span> {text}</span></h1>
            <p>Property finds by meeting your location. With more than 2000+ listings for you to choose from</p>
          </div>
          
  
          {/* Buttons for Rent/Buy with Icons */}
          <div className="toggle_buttons">
            <div className="toggle_btns">
              <button 
                className={`toggle_btn ${activeOption === 'rent' ? 'active' : ''}`} 
                onClick={() => toggleOption('rent')}
              >
                <FontAwesomeIcon icon={faHome} /> Rent Property
              </button>
              <button 
                className={`toggle_btn ${activeOption === 'buy' ? 'active' : ''}`} 
                onClick={() => toggleOption('buy')}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Buy Property
              </button>
            </div>
          </div>
  
          {/* Search Box Container with Border */}
          <div className="search_box_container">
            <div className="search_box">
              <input 
                type="text" 
                placeholder="Enter Keyword" 
                name="keyword"
                className="search_input" 
                value={formData.keyword}
                onChange={handleInputChange} 
              />
              <select 
                className="property-type2" 
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
                className="search_input" 
                value={formData.address}
                onChange={handleInputChange} 
              />
              <input 
                type="number" 
                placeholder="Min Price" 
                name="minPrice"
                className="search_input" 
                value={formData.minPrice}
                onChange={handleInputChange} 
              />
              <input 
                type="number" 
                placeholder="Max Price" 
                name="maxPrice"
                className="search_input" 
                value={formData.maxPrice}
                onChange={handleInputChange} 
              />
              <button className="search_btn" onClick={handleSearch}>
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