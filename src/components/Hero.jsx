import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const images = [
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768735713/1143632_myuc3x.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768735713/1187093_davfhk.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768735713/1512992_lgsvvg.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768721292/qghowpk6belwvidlweas.jpg",
    "https://res.cloudinary.com/dy9vdjxmm/image/upload/v1768736191/Amazing_Scenery_Wallpaper_tr3dn3.jpg"
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
                        alt={`Sandeep Tours & Holidays - Best Tour Packages in India Experience ${index + 1}`}
                        title="Book premium tour packages in India"
                        className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
                        loading={index === 0 ? "eager" : "lazy"}
                    />
                ))}
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content container animate-fade-in">
                <h1 className="hero-title">Best Tours and Travels in Indore | Sandeep Tours & Holidays</h1>
                <p className="hero-subtitle">Local • Outstation • Tour Packages</p>
                <div className="hero-buttons">
                    <a
                        href={`https://wa.me/9111961561?text=${encodeURIComponent("Hi, I want to book a cab.")}`}
                        className="btn-glass btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Book a Cab
                    </a>
                    <Link to="/gallery" className="btn-glass">View Cars</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
