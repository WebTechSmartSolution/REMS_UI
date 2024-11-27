import React, { useState } from 'react';
import './style/Section3rd.css'; // Assuming you have a separate CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHome, faBriefcase, faStore, faIndustry, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Section3rd = () => {
    const propertyTypes = [
        { name: 'Apartment', count: 35, icon: faBuilding },
        { name: 'Villas', count: 40, icon: faHome },
        { name: 'Offices', count: 15, icon: faBriefcase  },
        { name: 'Shops', count: 20, icon:faStore },
        { name: 'Factories', count: 12, icon: faIndustry },
        { name: 'Houses', count: 30, icon: faHome  },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalTypes = propertyTypes.length;

    const showPropertyTypes = (index) => {
        const offset = -index * (document.querySelector('.property-type-card').clientWidth + 20); // 20 is the margin between cards
        document.querySelector('.property-types').style.transform = `translateX(${offset}px)`;
    };

    const nextPropertyType = () => {
        const newIndex = (currentIndex + 1) % totalTypes; // Wrap around
        setCurrentIndex(newIndex);
        showPropertyTypes(newIndex);
    };

    const prevPropertyType = () => {
        const newIndex = (currentIndex - 1 + totalTypes) % totalTypes; // Wrap around
        setCurrentIndex(newIndex);
        showPropertyTypes(newIndex);
    };

    return (
        <section className="property-type-section">
            <div className="container1">
                <h2>Explore by Property Type</h2>
                <div className="nav-line"></div> {/* Navigation line */}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed.</p>

                <div className="property-types-slider">
                    <button className="prev" onClick={prevPropertyType}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="property-types-wrapper">
                        <div className="property-types">
                            {propertyTypes.map((property, index) => (
                                <div className="property-type-card" key={index}>
                                    <div className="icon">
                                        <FontAwesomeIcon icon={property.icon} />
                                    </div>
                                    <h3>{property.name}</h3>
                                    <p>{property.count} Properties</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="next" onClick={nextPropertyType}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Section3rd;
