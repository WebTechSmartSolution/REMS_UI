import React from 'react';
import './style/Section7th.css'; // Ensure CSS path is correct

const Section7th = () => {
  const partners = [
    { name: "Partner A", image: "src/assets/US1.jpeg", sales: "150k Sales", rating: "4.5/5" },
    { name: "Partner B", image: "src/assets/US4.jpeg", sales: "200k Sales", rating: "4.7/5" },
    { name: "Partner C", image: "src/assets/US3.jpeg", sales: "250k Sales", rating: "4.9/5" },
    { name: "Partner D", image: "src/assets/US5.jpeg", sales: "180k Sales", rating: "4.6/5" },
    { name: "Partner E", image: "src/assets/US6.jpeg", sales: "300k Sales", rating: "5/5" },
  ];

  // const logos = [
  //   { image: "src/assets/lo1.jpeg" }, 
  //   { image: "src/assets/l2.jpeg" }, 
  //   { image: "src/assets/l3.jpeg" }, 
  //   { image: "src/assets/l4.jpeg" }, 
  //   { image: "src/assets/l5.jpeg" },
  //   { image: "src/assets/l6.jpeg" },
  //   { image: "src/assets/l7.jpeg" }
  // ];

  return (
    <section id='Our-Partners' className="partners-section">
      <div className="main">
        <h2>Our Partners</h2>
        <div className="partners-cards">
          {partners.map((partner, index) => (
            <div className="partner-card" key={index}>
              <img src={partner.image} alt={partner.name} className="partner-image" />
              <div className="partner-info">
                <h3>{partner.name}</h3>
                <p>{partner.sales}</p>
                <p>Rating: {partner.rating}</p>
                <div className="rating">⭐⭐⭐⭐</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling ticker */}
        {/* <div className="ticker-wrapper">
          <div className="ticker">
            {logos.map((logo, index) => (
              <img src={logo.image} alt={`logo${index}`} className="logo-image" key={index} />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Section7th;
