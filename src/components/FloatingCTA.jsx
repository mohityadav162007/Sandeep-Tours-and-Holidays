import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import './FloatingCTA.css';

const FloatingCTA = () => {
    const whatsappNumber = "+919111961561";
    const phoneNumber = "+919111961561";
    const message = encodeURIComponent("Hi, I want to book a cab.");

    return (
        <div className="floating-cta-container">
            <a
                href={`tel:${phoneNumber}`}
                className="floating-btn btn-call glass"
                aria-label="Call Us"
            >
                <Phone size={24} />
            </a>

            <a
                href={`https://wa.me/${whatsappNumber}?text=${message}`}
                className="floating-btn btn-whatsapp glass animate-bounce"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Us"
            >
                <MessageCircle size={28} />
            </a>
        </div>
    );
};

export default FloatingCTA;
