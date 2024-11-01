import React from 'react';
import './Card.css';

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card2">
      <div className="card-labels2">
        {listing.isFeatured && <span className="label2 featured22">Featured</span>}
        {listing.isNew && <span className="label2 new22">New</span>}
        {/* {listing.propertyType && <span span className="label property-type">Prop_Type:</span>} */}
        
        <span className="label property-type22">{listing.propertyType}</span> 
      
      </div>
      
      <div className="card-image2">
        <img src={listing.imageUrl} alt={listing.title} />
        <div className="price2">${listing.price} / Night</div>
      </div>

      <div className="card-content2">
        <h3 className="property-title2">{listing.title}</h3>
        <p className="location2">{listing.location}</p>
        <div className="property-features22">
          <span>{listing.beds} Beds</span>
          <span>{listing.baths} Baths</span>
          <span>{listing.size} Sqft</span>
        </div>
      </div>
      
      <div className="card-footer2">
        <div className="agent-info2">
          <img src={listing.agentImage} alt={listing.agentName} className="agent-image2" />
          <span className="agent-name2">{listing.agentName}</span>
        </div>
        <button className="book-now-btn2">See Details</button>
      </div>
    </div>
  );
};

export default ListingCard;
