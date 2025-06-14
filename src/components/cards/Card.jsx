import React from 'react';
import './Card.css';

const ListingCard = ({ listing }) => {

  const getCurrencySymbol = (currencyType) => {
    switch (currencyType) {
      case "Pkr":
        return "₨ "; // Pakistani Rupee
      case "usd":
        return "$ ";  // US Dollar
      case "EUR":
        return "€ ";  // Euro
      case "GBP":
        return "£ ";  // British Pound
      case "INR":
        return "₹ ";  // Indian Rupee
      default:
        return "$ ";  // Default to USD if no match
    }
  };
  console.log(listing.currencyType);
  return (
    <div className="listing-card2">
      {/* Labels */}
      <div className="card-labels2">
      {(listing.salePrice > 5000 || listing.price > 5000) && ( <span className="label2 featured22">Featured</span>)}
        {listing.isNew  && <span className="label2 new22">New</span>}
        <span className="label property-type22">{listing.propertyType || listing.Propertytype}</span>
      </div>


      {/* Image and Price */}
      <div className="card-image2">
      <img
  src={
    listing.images?.[0]?.path
      ? `http://localhost:5000${listing.images[0].path}`
      : listing.images || "/src/assets/US1.jpeg" // Fallback to another source or default image
  }
  alt={`Image of ${listing.title || listing.propertyName}`}
/>
       
<div className="price2">
  {getCurrencySymbol(listing.currencyType)}{listing.salePrice || listing.price}
</div>

      </div>

      {/* Property Details */}
      <div className="card-content2">
        <h3 className="property-title2">{listing.propertyName || listing.title}</h3>
        <p className="location2">{listing.city || listing.location}, {listing.state}</p>
        <div className="property-features22">
          <span>{listing.noOfBedrooms || listing.beds} Beds</span>
          <span>{listing.noOfBathrooms || listing.baths} Baths</span>
          <span>{listing.sqft || listing.size} Sqft</span>
        </div>
      </div>

      {/* See Details Button */}
      <div className="card-footer2">
        <button className="book-now-btn2" onClick={() => window.location.href = `/view_listing_details/${listing.id}`}>See Details</button>
      </div>
    </div>
  );
};

export default ListingCard;
