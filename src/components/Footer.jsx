import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer glass">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <h2 className="footer-logo">Sandeep <span>Tours & Holidays</span></h2>
                    <p>Premium cab and tour services for your next journey.</p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/gallery">Premium Tour Fleet</Link></li>
                        <li><Link to="/tours">Best India Tour Packages</Link></li>
                        <li><Link to="/contact">Contact Travel Expert</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><Phone size={16} /> +91 7725844722, +91 9111961561</li>
                        <li><MessageCircle size={16} /> +91 7725844722, +91 9111961561</li>
                        <li><Mail size={16} /> info@sandeeptoursandholidays.xyz</li>
                        <li><MapPin size={16} /> Vijay Nagar, Indore</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Sandeep Tours & Holidays. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
