import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-video-container">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                >
                    <source
                        src="https://res.cloudinary.com/dy9vdjxmm/video/upload/v1/2103099-uhd_3840_2160_30fps_1_huuitj.mp4"
                        type="video/mp4"
                    />
                </video>
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
