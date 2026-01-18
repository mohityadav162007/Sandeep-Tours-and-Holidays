import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar glass">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Sandeep <span>Travels</span>
                </Link>

                <div className="nav-actions">
                    <a href="tel:+919111961561" className="nav-btn-call mobile-only">
                        <Phone size={18} /> <span>Call</span>
                    </a>

                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                {/* Mobile Overlay */}
                <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className={`nav-links ${isActive('/')}`} onClick={toggleMenu}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/gallery" className={`nav-links ${isActive('/gallery')}`} onClick={toggleMenu}>Gallery</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/tours" className={`nav-links ${isActive('/tours')}`} onClick={toggleMenu}>Tours</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/contact" className={`nav-links ${isActive('/contact')}`} onClick={toggleMenu}>Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
