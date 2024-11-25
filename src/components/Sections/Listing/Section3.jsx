import React, { useState } from "react";
import "./style/Section3.css";

const Filters = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("rent");

  // Handle the search
  const handleSearch = () => {
    onSearch({ location, priceRange, propertyType });
    
  };

  return (
    <div className="filter-navbar">
      <div className="filters">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="filter-input"
        />

        <input
          type="number"
          placeholder="Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="filter-input"
        />
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="filter-select"
        >
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
        </select>

        <button onClick={handleSearch} className="search-btn">
          <i className="search-icon22">🔍</i> Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
