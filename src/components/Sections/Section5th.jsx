import React from 'react';
import "./style/Section5th.css"; // Adjust the path as needed

const Section5th = () => {
  const cities = [
    { name: "New York", properties: "100 properties", imageUrl: "src/assets/US6.jpeg" },
    { name: "Thailand", properties: "250 properties", imageUrl: "src/assets/US1.jpeg" },
    { name: "United Kingdom", properties: "180 properties", imageUrl: "src/assets/US2.jpeg" },
    { name: "Singapore", properties: "300 properties", imageUrl: "src/assets/US3.jpeg" },
    { name: "Argentina", properties: "130 properties", imageUrl: "src/assets/US4.jpeg" },
    { name: "United Arab Emirates", properties: "150 properties", imageUrl: "src/assets/US5.jpeg" },
  ];

  return (
    <section className="cities-listing-section">
      <div className="main">
        <h2>Cities With Listing</h2>
        <div className="nav-line"></div> 
        <p>Discover places we love the most</p>
        <div className="cities-slider">
          {cities.map((city, index) => (
            <div className="city-card" key={index}>
              <div className="city-image">
                <img src={city.imageUrl} alt={city.name} />
              </div>
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
