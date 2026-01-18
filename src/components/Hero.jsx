import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const images = [
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768735713/1143632_myuc3x.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768735713/1187093_davfhk.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768735713/1512992_lgsvvg.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768735712/Amazing_Scenery_Wallpaper_tr3dn3.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768721292/qghowpk6belwvidlweas.jpg"
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
