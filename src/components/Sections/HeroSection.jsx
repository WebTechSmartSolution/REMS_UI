import React from 'react';
import { Link } from "react-router-dom";
import './style/HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-container">
                {/* Left Side Content */}
                <div className="hero-left">
                    <h1 className='hero-title'>Welcome to <span className="dynamic-text">RentalEase</span></h1>
                    <p>Effortlessly manage your properties and discover exceptional rental options. RentalEase is your partner in modern property management.</p>
                    <div className="cta-buttons">
    <Link to="/all_Listings" className='Link'>Explore Listings</Link>
    <Link to="/signup" className="secondary">Get Started</Link>
</div>
                    <div className="hanging-images">
                        <img src="/src/assets/rental2.jpeg" alt="Hanging Property 1" />
                        <img src="/src/assets/rental image.jpeg" alt="Hanging Property 2" />
                        <img src="/src/assets/re3.jpeg" alt="Hanging Property 3" />
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="hero-right">
                    <div className="multi-card">
                        <img src=" /src/assets/US1.jpeg" alt="Luxury House" className="card-frame" />
                        <img src="/src/assets/US2.jpeg" alt="Modern Apartment" className="card-frame" />
                        <img src="/src/assets/US3.jpeg" alt="Beach Villa" className="card-frame" />
                        
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
