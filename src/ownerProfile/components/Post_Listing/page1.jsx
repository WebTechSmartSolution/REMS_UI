import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../../services/Auth_JwtApi/AuthService";
import "./Style/Section1.css"; // For styling
import PropertyGallery from "./PropertieGallary";
import {notify} from "../../../services/errorHandlingService";

const AddPost = () => {
  const [formData, setFormData] = useState({
    propertyInfo: {
      propertyName: "",
      propertyType: "",
      currencyType: "",
      salePrice: "",
      offerPrice: "",
    },
    propertyDetails: {
      propertyId: "",
      pricePerSqft: "",
      structureType: "",
      noOfBedrooms: "",
      noOfBathrooms: "",
      sqft: "",
      noOfFloors: "",
      garageSize: "",
      yearConstructed: "",
    },
    amenities: {
      airConditioning: false,
      lawn: false,
      swimmingPool: false,
      barbecue: false,
      microwave: false,
      tvCable: true,
      dryer: false,
      wifi: true,
    },
   
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      mapUrl: "",
    },
    gallery: [],
  });

  const [errors, setErrors] = useState({
    propertyInfo: {
      propertyName: "",
      propertyType: "",
      currencyType: "",
      salePrice: "",
      offerPrice: "",
    },
    propertyDetails: {
      propertyId: "",
      pricePerSqft: "",
      structureType: "",
      noOfBedrooms: "",
      noOfBathrooms: "",
      sqft: "",
      noOfFloors: "",
      garageSize: "",
      yearConstructed: "",
    },
    amenities: {
      airConditioning: false,
      lawn: false,
      swimmingPool: false,
      barbecue: false,
      microwave: false,
      tvCable: true,
      dryer: false,
      wifi: true,
    },
   
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      mapUrl: "",
    },
    gallery: [],
   
  });
  

  // Handle input changes
  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));

    if (value.trim() !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [section]: {
          ...prevErrors[section],
          [key]: false,
        },
      }));
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      propertyInfo: {
        propertyName: "",
        propertyType: "buy",
        currencyType: "usd",
        salePrice: "",
        offerPrice: "",
      },
      propertyDetails: {
        propertyId: "",
        pricePerSqft: "",
        structureType: "apartment",
        noOfBedrooms: "",
        noOfBathrooms: "",
        sqft: "",
        noOfFloors: "",
        garageSize: "",
        yearConstructed: "",
      },
      amenities: {
        airConditioning: false,
        lawn: false,
        swimmingPool: false,
        barbecue: false,
        microwave: false,
        tvCable: true,
        dryer: false,
        wifi: true,
      },
     
      location: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
        mapUrl: "",
      },
      gallery: [],
      
    });
  };

  // Handle form submission with validation
  const handleSubmit = async () => {
    const newErrors = {
      propertyInfo: {
        propertyType: !formData.propertyInfo.propertyType.trim(),
        currencyType: !formData.propertyInfo.currencyType.trim(),
        offerPrice: !formData.propertyInfo.offerPrice.trim(),
        propertyName: !formData.propertyInfo.propertyName.trim(),
        salePrice: !formData.propertyInfo.salePrice.trim(),
      },
      propertyDetails: {
        propertyId: !formData.propertyDetails.propertyId.trim(),
        pricePerSqft: !formData.propertyDetails.pricePerSqft.trim(),
        noOfBedrooms: !formData.propertyDetails.noOfBedrooms.trim(),
        noOfBathrooms: !formData.propertyDetails.noOfBathrooms.trim(),
        sqft: !formData.propertyDetails.sqft.trim(),
        noOfFloors: !formData.propertyDetails.noOfFloors.trim(),
        garageSize: !formData.propertyDetails.garageSize.trim(),
        yearConstructed: !formData.propertyDetails.yearConstructed.trim(),
      },
      
      location: {
        address: !formData.location.address.trim(),
        city: !formData.location.city.trim(),
        state: !formData.location.state.trim(),
        zipCode: !formData.location.zipCode.trim(),
      },
    };
  
    setErrors(newErrors);
  
    // Check if there are any errors across all sections
    const hasErrors = Object.values(newErrors).some((section) =>
      Object.values(section).some(Boolean)
    );
  
    if (!hasErrors) {
      try {
        const form = new FormData();
  
        // Append images
        formData.gallery.forEach((file) => form.append('Images', file));
  
        // Append other fields as JSON strings
        form.append('propertyInfo', JSON.stringify(formData.propertyInfo));
        form.append('propertyDetails', JSON.stringify(formData.propertyDetails));
        form.append('location', JSON.stringify(formData.location));
        form.append('amenities', JSON.stringify(formData.amenities));
        for (let [key, value] of form.entries()) {
          console.log(`${key}:`, value);
        }
        const response = await authService.PostListings(form);
        notify( "success", "Data submitted successfully."+ response.message);
        handleReset(); // Reset form after successful submission
      } catch (error) {
        notify( "error", "There was an error submitting the data."+ error.message);
      }
    } else {
      notify("error", "Please fill all required fields.");
    }
  };
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="Parent_Main">
        <div className="heading">
          <h1>Add New Property</h1>
          <div className="breadcrumb">
            <Link className="heading-links" to="#">
              Home
            </Link>{" "}
            /{" "}
            <Link className="heading-links" to="#">
              Add New Property
            </Link>
          </div>
        </div>

        <div className="Tab_Container">
          <ul className="tab-links">
            <li onClick={() => scrollToSection("property-info")}>
              Property Information
            </li>
            <li onClick={() => scrollToSection("property-details")}>
              Property Details
            </li>
            <li onClick={() => scrollToSection("amenities")}>Amenities</li>
            <li onClick={() => scrollToSection("gallery")}>Gallery</li>
            
            <li onClick={() => scrollToSection("location")}>Location</li>
          </ul>
        </div>

        <div className="property-info-container">
          {/* Property Information Section */}
          <div className="property-info-section" id="property-info">
            <div className="info-description">
              <h3>Property Information</h3>
              <p>
                Provide essential details about the property. These details will
                help potential tenants understand the property’s key features,
                such as its type, location, and the number of rooms available.
              </p>
            </div>

            <div className="info-inputs-container">
              <div className="info-inputs">
                {/* Property Name */}
                <div className="info-form-group">
                  <label>Property Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className={`info-input ${
                      errors.propertyInfo.propertyName ? "error" : ""
                    }`}
                    value={formData.propertyInfo.propertyName}
                    onChange={(e) => {
                      console.log("PropertyName onChange event triggered");
                      handleChange("propertyInfo", "propertyName", e.target.value);
                    }}
                  />
                  {errors.propertyInfo.propertyName && (
                    <span className="error-message">
                      Property Name is required.
                    </span>
                  )}
                </div>

                {/* Property Type */}
                <div className="info-form-group">
                  <label>Property Type</label>
                  <select
                    className={`info-select ${
                      errors.propertyInfo.propertyType ? "error" : ""
                    }`}
                    value={formData.propertyInfo.propertyType || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyInfo",
                        "propertyType",
                        e.target.value
                      )
                    }
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>

                {/* Currency Type */}
                <div className="info-form-group">
                  <label>Currency Type</label>
                  <select
                    className={`info-select ${
                      errors.propertyInfo.currencyType ? "error" : ""
                    }`}
                    value={formData.propertyInfo.currencyType || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyInfo",
                        "currencyType",
                        e.target.value
                      )
                    }
                  >
                    <option value="usd">USD</option>
                    <option value="euro">Euro</option>
                  </select>
                </div>

                {/* Sale Price */}
                <div className="info-form-group">
                  <label>Sale Price</label>
                  <input
                    type="text"
                    placeholder="Enter Sale Price"
                    className={`info-input ${
                      errors.propertyInfo.salePrice ? "error" : ""
                    }`}
                    value={formData.propertyInfo.salePrice || ""}
                    onChange={(e) =>
                      handleChange("propertyInfo", "salePrice", e.target.value)
                    }
                  />
                  {errors.propertyInfo.salePrice && (
                    <span className="error-message">
                      Sale Price is required.
                    </span>
                  )}
                </div>

                {/* Offer Price */}
                <div className="info-form-group">
                  <label>Offer Price</label>
                  <input
                    type="text"
                    placeholder="Enter Offer Price"
                    className={`info-input ${
                      errors.propertyInfo.offerPrice ? "error" : ""
                    }`}
                    value={formData.propertyInfo.offerPrice || ""}
                    onChange={(e) =>
                      handleChange("propertyInfo", "offerPrice", e.target.value)
                    }
                  />
                  {errors.propertyInfo.offerPrice && (
                    <span className="error-message">
                      Offer Price is required.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div className="property-details-section" id="property-details">
            <div className="details-description">
              <h3>Property Details</h3>
              <p>
                Complete the detailed information about the property, including
                the size, rental price, and additional features. This section
                allows you to set the foundational details needed for accurate
                listings.
              </p>
            </div>

            <div className="details-inputs-container">
              <div className="details-inputs">
                {/* Property ID */}
                <div className="details-form-group">
                  <label>Property ID</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${
                      errors.propertyDetails.propertyId ? "error" : ""
                    }`}
                    value={formData.propertyDetails.propertyId || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "propertyId",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.propertyId && (
                    <span className="error-message">
                      Property ID is required.
                    </span>
                  )}
                </div>

                {/* Price per Sqft */}
                <div className="details-form-group">
                  <label>Price per Sqft</label>
                  <input
                    type="text"
                    placeholder="Enter Price"
                    className={`details-input ${
                      errors.propertyDetails.pricePerSqft ? "error" : ""
                    }`}
                    value={formData.propertyDetails.pricePerSqft || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "pricePerSqft",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.pricePerSqft && (
                    <span className="error-message">
                      Price per Sqft is required.
                    </span>
                  )}
                </div>

                {/* Structure Type */}
                <div className="details-form-group">
                  <label>Structure Type</label>
                  <select
                    className={`details-select ${
                      errors.propertyDetails.structureType ? "error" : ""
                    }`}
                    value={formData.propertyDetails.structureType || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "structureType",
                        e.target.value
                      )
                    }
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                {/* No of Bedrooms */}
                <div className="details-form-group">
                  <label>No of Bedrooms</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${
                      errors.propertyDetails.noOfBedrooms ? "error" : ""
                    }`}
                    value={formData.propertyDetails.noOfBedrooms || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "noOfBedrooms",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.noOfBedrooms && (
                    <span className="error-message">
                      Number of Bedrooms is required.
                    </span>
                  )}
                </div>

                {/* No of Bathrooms */}
                <div className="details-form-group">
                  <label>No of Bathrooms</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${
                      errors.propertyDetails.noOfBathrooms ? "error" : ""
                    }`}
                    value={formData.propertyDetails.noOfBathrooms || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "noOfBathrooms",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.noOfBathrooms && (
                    <span className="error-message">
                      Number of Bathrooms is required.
                    </span>
                  )}
                </div>

                {/* Sqft */}
                <div className="details-form-group">
                  <label>Sqft</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${
                      errors.propertyDetails.sqft ? "error" : ""
                    }`}
                    value={formData.propertyDetails.sqft || ""}
                    onChange={(e) =>
                      handleChange("propertyDetails", "sqft", e.target.value)
                    }
                  />
                  {errors.propertyDetails.sqft && (
                    <span className="error-message">Sqft is required.</span>
                  )}
                </div>

                {/* No of Floors */}
                <div className="details-form-group">
                  <label>No of Floors</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${
                      errors.propertyDetails.noOfFloors ? "error" : ""
                    }`}
                    value={formData.propertyDetails.noOfFloors || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "noOfFloors",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.noOfFloors && (
                    <span className="error-message">
                      Number of Floors is required.
                    </span>
                  )}
                </div>

                {/* Garage Size */}
                <div className="details-form-group">
                  <label>Garage Size</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${
                      errors.propertyDetails.garageSize ? "error" : ""
                    }`}
                    value={formData.propertyDetails.garageSize || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "garageSize",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.garageSize && (
                    <span className="error-message">
                      Garage Size is required.
                    </span>
                  )}
                </div>

                {/* Year Constructed */}
                <div className="details-form-group">
                  <label>Year Constructed</label>
                  <input
                    type="date"
                    className={`details-input ${
                      errors.propertyDetails.yearConstructed ? "error" : ""
                    }`}
                    value={formData.propertyDetails.yearConstructed || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "yearConstructed",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.yearConstructed && (
                    <span className="error-message">
                      Year Constructed is required.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="amenities-section" id="amenities">
          <div className="amenities-container">
            {/* Left side: Heading and Description */}
            <div className="amenities-description">
              <h3>Amenities</h3>
              <p>
                Select the amenities that are available for your property. These
                features can make your listing more attractive to potential
                buyers or renters.
              </p>
            </div>

            {/* Right side: Input Fields for Amenities */}
            <div className="amenities-inputs">
              <div className="amenities-grid">
                {/* Amenity Item: Air Conditioning */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="airConditioning"
                    name="airConditioning"
                    checked={formData.amenities?.airConditioning || false}
                    onChange={(e) =>
                      handleChange(
                        "amenities",
                        "airConditioning",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="airConditioning">Air Condition</label>
                </div>

                {/* Amenity Item: Lawn */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="lawn"
                    name="lawn"
                    checked={formData.amenities?.lawn || false}
                    onChange={(e) =>
                      handleChange("amenities", "lawn", e.target.checked)
                    }
                  />
                  <label htmlFor="lawn">Lawn</label>
                </div>

                {/* Amenity Item: Swimming Pool */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="swimmingPool"
                    name="swimmingPool"
                    checked={formData.amenities?.swimmingPool || false}
                    onChange={(e) =>
                      handleChange(
                        "amenities",
                        "swimmingPool",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="swimmingPool">Swimming Pool</label>
                </div>

                {/* Amenity Item: Barbecue */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="barbecue"
                    name="barbecue"
                    checked={formData.amenities?.barbecue || false}
                    onChange={(e) =>
                      handleChange("amenities", "barbecue", e.target.checked)
                    }
                  />
                  <label htmlFor="barbecue">Barbecue</label>
                </div>

                {/* Amenity Item: Microwave */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="microwave"
                    name="microwave"
                    checked={formData.amenities?.microwave || false}
                    onChange={(e) =>
                      handleChange("amenities", "microwave", e.target.checked)
                    }
                  />
                  <label htmlFor="microwave">Microwave</label>
                </div>

                {/* Amenity Item: TV Cable */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="tvCable"
                    name="tvCable"
                    checked={formData.amenities?.tvCable || false}
                    onChange={(e) =>
                      handleChange("amenities", "tvCable", e.target.checked)
                    }
                  />
                  <label htmlFor="tvCable">TV Cable</label>
                </div>

                {/* Amenity Item: Dryer */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="dryer"
                    name="dryer"
                    checked={formData.amenities?.dryer || false}
                    onChange={(e) =>
                      handleChange("amenities", "dryer", e.target.checked)
                    }
                  />
                  <label htmlFor="dryer">Dryer</label>
                </div>

                {/* Amenity Item: WiFi */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="wifi"
                    name="wifi"
                    checked={formData.amenities?.wifi || false}
                    onChange={(e) =>
                      handleChange("amenities", "wifi", e.target.checked)
                    }
                  />
                  <label htmlFor="wifi">WiFi</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <PropertyGallery setFieldValue={setFormData} />

       

        <div className="properties-location-section" id="location">
          <div className="left-column">
            <h3>Property Location</h3>
            <p className="section-info">
              Provide the detailed location of the property to help tenants
              easily locate it.
            </p>
          </div>

          <div className="right-column">
            {/* Address Input */}
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter property address"
                className="input-field"
                value={formData.location?.address || ""}
                onChange={(e) =>
                  handleChange("location", "address", e.target.value)
                }
              />
              {errors.location?.address && (
                <span className="error-message">Address is required.</span>
              )}
            </div>

            {/* Row for City and State */}
            <div className="form-group-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="input-field"
                  value={formData.location?.city || ""}
                  onChange={(e) =>
                    handleChange("location", "city", e.target.value)
                  }
                />
                {errors.location?.city && (
                  <span className="error-message">City is required.</span>
                )}
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  placeholder="Enter state"
                  className="input-field"
                  value={formData.location?.state || ""}
                  onChange={(e) =>
                    handleChange("location", "state", e.target.value)
                  }
                />
                {errors.location?.state && (
                  <span className="error-message">State is required.</span>
                )}
              </div>
            </div>

            {/* Row for Zip Code and Map URL */}
            <div className="form-group-row">
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  placeholder="Enter zip code"
                  className="input-field"
                  value={formData.location?.zipCode || ""}
                  onChange={(e) =>
                    handleChange("location", "zipCode", e.target.value)
                  }
                />
                {errors.location?.zipCode && (
                  <span className="error-message">Zip Code is required.</span>
                )}
              </div>
              <div className="form-group">
                <label>Map URL</label>
                <input
                  type="text"
                  placeholder="Enter map URL (optional)"
                  className="input-field"
                  value={formData.location?.mapUrl || ""}
                  onChange={(e) =>
                    handleChange("location", "mapUrl", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button-section">
          <button className="reset-button" onClick={handleReset} type="button">
            Reset
          </button>

          <button
            className="submit-button"
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPost;