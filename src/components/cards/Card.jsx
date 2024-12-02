import React from 'react';
import './Card.css';

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card2">
      {/* Labels */}
      <div className="card-labels2">
        {listing.propertyType && (
          <span className="label property-type22">{listing.propertyType}</span>
        )}
      </div>

      {/* Image and Price */}
      <div className="card-image2">
        <img
          src={listing.images?.[0]?.path || '/default-image.jpg'}
          alt={listing.propertyName}
        />
        <div className="price2">
          {listing.currencyType} {listing.salePrice}
        </div>
      </div>

      {/* Property Details */}
      <div className="card-content2">
        <h3 className="property-title2">{listing.propertyName}</h3>
        <p className="location2">{listing.city}, {listing.state}</p>
        <div className="property-features22">
          <span>{listing.noOfBedrooms} Beds</span>
          <span>{listing.noOfBathrooms} Baths</span>
          <span>{listing.sqft} Sqft</span>
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
