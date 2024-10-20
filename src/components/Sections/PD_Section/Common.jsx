import React from 'react'
import "../style/PD_Section.css";


function Common() {
  return (
    <>
    <div className="Heading">
      <h2>Propertie_Details</h2>
      <p>Pick The Best You want.</p>
    </div>
      <div className="property-details">
        <div className="property-header">
          <span className="property-type1">Buy</span>
          <span className="property-type">Apartment</span>

          <h1>Modern Apartment in the City Center</h1>
          <div className="property-status">
            <span className="property-price">$4,000</span>
            <span className="last-updated">Last Updated on: 15 Jan 2023</span>
          </div>
          <div className="property-buttons">
            <button className="share-btn">
              <i className="fas fa-share"></i> Share
            </button>

            <button className="wishlist-btn">
              <i className="fas fa-heart"></i> Wishlist
            </button>
            <button className="book-btn1">
              <i className="fas fa-calendar-check"></i> Book Property
            </button>
          </div>
        </div>
      </div>
      <div className="hr">
        <hr />
      </div>
    </>
  )
}

export default Common