import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation, faBuilding, faHome, faSearch , faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import './style/Section2nd.css'

function Section2nd() {
  return (
    <div> <section className="how-it-works-section">
    <div className="main">
      <h2>How It Works</h2>
      {/* Navigation or separator line */}
      <div className="nav-line">
        <span></span>
      </div>
      <p className="how-it-works-description">Follow these three simple steps to book your place easily.</p> 
      <div className="steps-container">
        <div className="step">
          <div className="step-icon">
            <FontAwesomeIcon icon={faSearchLocation} />
          </div>
          <h3>01. Search For Location</h3>
          <p>Locate the best property by searching for locations with ease.</p>
        </div>

        <div className="step">
          <div className="step-icon">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <h3>02. Select Property Type</h3>
          <p>Pick your preferred type of property from houses, apartments, etc.</p>
        </div>

        <div className="step">
          <div className="step-icon">
            <FontAwesomeIcon icon={faHome} />
          </div>
          <h3>03. Book Your Property</h3>
          <p>Finalize the booking of the property that meets your needs.</p>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Section2nd