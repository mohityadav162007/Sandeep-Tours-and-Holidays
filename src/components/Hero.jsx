import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const images = [
    "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://th.bing.com/th/id/OIP.Cj0Pg-2Ao9hJ_ZmUC-UEvwHaEK?w=284&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    "https://th.bing.com/th/id/OIP.Lrx8EZamCD0MY-UJudiVygHaFi?w=266&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    "https://th.bing.com/th/id/OIP.4kxJ0E-QjJkiG87JA6QXpAHaE8?w=239&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    "https://th.bing.com/th/id/OIP.gS_raA5-_iiW5sr-hreN0gHaE8?w=194&h=150&c=6&o=5&dpr=1.4&pid=1.7",
    "https://th.bing.com/th/id/OIP.RS6jj1myc2hoLx4Zj3FiJQHaFj?w=200&h=150&c=6&o=5&dpr=1.4&pid=1.7"
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
