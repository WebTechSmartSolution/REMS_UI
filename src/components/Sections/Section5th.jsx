import React from 'react';
import "./style/Section5th.css"; // Adjust the path as needed

const Section5th = () => {
  const cities = [
    { name: "New York", properties: "100 properties", className: "bg1" },
    { name: "Thailand", properties: "250 properties", className: "bg2" },
    { name: "United Kingdom", properties: "180 properties", className: "bg3" },
    { name: "Singapore", properties: "300 properties", className: "bg4" },
    { name: "Argentina", properties: "130 properties", className: "bg5" },
    { name: "United Arab Emirates", properties: "150 properties", className: "bg6" },
  ];

  return (
    <section className="cities-listing-section">
      <div className="container">
        <h2>Cities With Listing</h2>
        <div className="nav-line"></div> 
        <p>Discover places we love the most</p>
        <div className="cities-slider">
          {cities.map((city, index) => (
            <div className="city-card" key={index}>
              <div className={`city-color ${city.className}`}></div>
              <div className="city-info">
                <h3>{city.name}</h3>
                <p>{city.properties}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All Properties</button>
      </div>
    </section>
  );
};

export default Section5th;
