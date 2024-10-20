import React from "react";
import { useState } from "react";
// import "../../style/Section2.css";
import image1 from "../../../assets/images.jpeg";
import thumb1 from "../../../assets/pak1.jpeg";
import thumb2 from "../../../assets/US2.jpeg";
import thumb3 from "../../../assets/US3.jpeg";
import thumb4 from "../../../assets/US1.jpeg";
import "../style/PD_Section.css";

const Section3 = () => {
  const [mainImage, setMainImage] = useState(image1);
  const amenitiesList = [
    "Air Conditioning",
    "Swimming Pools",
    "Gym",
    "Landscaped Gardens",
    "Open Spaces",
    "Spa",
    "Billiards Table",
    "Surveillance Cameras"
  ];

  // Array of thumbnail images
  const thumbnails = [thumb1, thumb2, thumb3, thumb4];

  // Function to update the main image
  const handleImageClick = (thumbnail) => {
    setMainImage(thumbnail);
  };

  return (
    <>
    
      {/* Our Main section start from hare  */}
      <section className="Main-section">
        <div className="images-section">
          <h3 className="section-title">Property Images</h3>
          {/* Main Image */}
          <div className="main-image-container">
            <img
              id="mainImage"
              src={mainImage}
              alt="Main Property"
              className="main-image"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="thumbnail-images">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageClick(thumb)}
                className={`thumbnail ${
                  thumb === mainImage ? "active-thumbnail" : ""
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Overview div start hare  */}
        <div className="overview-section">
          <h3>Overview</h3>
          <p className="property-description">
            This modern apartment is located in the heart of the city, offering
            stunning views and luxurious amenities. It features 3 bedrooms, 2
            bathrooms, a fully equipped kitchen, and a spacious living area. The
            property also offers easy access to public transportation, shopping
            centers, and schools.
          </p>
          <ul className="property-features">
            <li>
              <i className="fas fa-bed"></i> 3 Bedrooms
            </li>
            <li>
              <i className="fas fa-bath"></i> 2 Bathrooms
            </li>
            <li>
              <i className="fas fa-car"></i> 1 Garage
            </li>
            <li>
              <i className="fas fa-tree"></i> Garden View
            </li>
            <li>
              <i className="fas fa-bus"></i> Near Public Transport
            </li>
          </ul>
        </div>
        <div className="description-section">
          <h3>Property Description</h3>
          <p>
            This spacious and modern apartment offers everything you need for
            comfortable city living. The interior is designed with an
            open-concept layout, creating a seamless flow between the living,
            dining, and kitchen areas. Large windows throughout the apartment
            allow for plenty of natural light, creating a bright and airy
            atmosphere.
          </p>
          <p>
            The master bedroom comes with an en-suite bathroom, complete with
            modern fixtures and a luxurious bathtub. The two additional bedrooms
            are well-sized and can be used as guest rooms or home offices. The
            kitchen is fully equipped with state-of-the-art appliances,
            including a dishwasher, oven, and microwave.
          </p>
          <p>
            Located in a prime area, this property offers easy access to a
            variety of local amenities, including shopping centers, restaurants,
            parks, and public transportation. Whether you're a young
            professional or a growing family, this apartment is an excellent
            choice for those seeking a stylish, convenient living space in the
            heart of the city.
          </p>
        </div>
        {/* Propertie address */}
        <div className="property-address">
      <h3>Property Address</h3>
      <div className="address-details">
        <div className="address-item">
          <span className="label">Address:</span>
          <span className="value">Fonis Park</span>
        </div>
        <div className="address-item">
          <span className="label">City:</span>
          <span className="value">Jersey City</span>
        </div>
        <div className="address-item">
          <span className="label">State/County:</span>
          <span className="value">New Jersey State</span>
        </div>
        <div className="address-item">
          <span className="label">Country:</span>
          <span className="value">United States</span>
        </div>
        <div className="address-item">
          <span className="label">Zip:</span>
          <span className="value">07305</span>
        </div>
        <div className="address-item">
          <span className="label">Area:</span>
          <span className="value">Greenville</span>
        </div>
      </div>
    </div>
{/* propertie details  */}
<div className="property-details1">
      <h3>Property Details</h3>
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Property ID:</span>
          <span className="detail-value">22972</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Price:</span>
          <span className="detail-value">$1,509/Night</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Size:</span>
          <span className="detail-value">3600 Sq Ft</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Rooms:</span>
          <span className="detail-value">10</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Year Built:</span>
          <span className="detail-value">2005</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Available From:</span>
          <span className="detail-value">2023-11-18</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Floors No:</span>
          <span className="detail-value">3</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Garage Size:</span>
          <span className="detail-value">2 Cars</span>
        </div>
      </div>
    </div>

{/* Amininties general */}
<div className="amenities">
      <h3>Amenities</h3>
      <div className="amenities-grid">
        {amenitiesList.map((amenity, index) => (
          <div key={index} className="amenity-item">
            {amenity}
          </div>
        ))}
      </div>
    </div>


      </section>
    </>
  );
};

export default Section3;
