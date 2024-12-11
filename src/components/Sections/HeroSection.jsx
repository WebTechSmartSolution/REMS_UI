import React from 'react';
import './style/HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to <span className="dynamic-text">RentalEase</span></h1>
                <p>Effortlessly manage your properties and discover exceptional rental options. RentalEase is your partner in modern property management.</p>
                <div className="cta-buttons">
                    <a href="/listings">Explore Listings</a>
                    <a href="/signup" className="secondary">Get Started</a>
                </div>
            </div>
            <div className="Image_cardss">
                <img src="/src/assets/rental2.jpeg" alt="Property 1" />
                <img src="/src/assets/rental image.jpeg" alt="Property 2" />
                <img src="/src/assets/re3.jpeg" alt="Property 3" />
            </div>
        </section>
    );
};

export default HeroSection;
