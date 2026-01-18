import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const images = [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80", // Travel/Road Trip
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80", // Car on road
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80", // Friends/Travel
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80", // Driving
    "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=1920&q=80", // Scenic road
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80"  // Luxury car/Travel
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            <div className="hero-slideshow">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Hero Slide ${index + 1}`}
                        className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
                    />
                ))}
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content container animate-fade-in">
                <h1 className="hero-title">Sandeep Tours & Holidays</h1>
                <p className="hero-subtitle">Local • Outstation • Tour Packages</p>
                <div className="hero-actions">
                    <Link to="/booking" className="btn-glass btn-primary">Book a Cab</Link>
                    <Link to="/gallery" className="btn-glass">View Cars</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
