import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would save the inquiry to the data context or backend
  };

  const contactInfo = [
    { icon: Phone, title: 'Call Us', value: '+91 98765 43210', link: 'tel:+919876543210' },
    { icon: Mail, title: 'Email', value: 'info@sandeeptravels.com', link: 'mailto:info@sandeeptravels.com' },
    { icon: MapPin, title: 'Office', value: 'Vijay Nagar, Indore', link: null }
  ];

  return (
    <div className="contact-page-container">
      <div className="container section-padding">
        <div className="header-center animate-fade-in">
          <h1>Contact Us</h1>
          <p>Have questions? We're here to help you 24/7.</p>
        </div>

        <div className="contact-main-grid">
          {/* Left Side: Contact Info */}
          <div className="contact-sidebar">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="info-card glass">
                <div className="info-icon">
                  <item.icon size={22} />
                </div>
                <div className="info-details">
                  <h3>{item.title}</h3>
                  {item.link ? (
                    <a href={item.link}>{item.value}</a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA Card */}
            <a href="https://wa.me/919876543210?text=Hi, I want to book a cab." className="whatsapp-cta-card">
              <div className="whatsapp-icon-wrap">
                <MessageCircle size={28} />
              </div>
              <div className="cta-text">
                <h3>Chat on WhatsApp</h3>
                <p>Get a quick quote right away!</p>
              </div>
            </a>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form-card glass">
            {submitted ? (
              <div className="success-screen-contact animate-fade-in">
                <CheckCircle size={64} color="var(--success)" />
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. We will get back to you within 1-2 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary">Send Another</button>
              </div>
            ) : (
              <form className="contact-form-ios" onSubmit={handleSubmit}>
                <div className="form-group-contact">
                  <label>Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                </div>
                <div className="form-group-contact">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group-contact">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                </div>
                <div className="form-group-contact">
                  <label>Message *</label>
                  <textarea name="message" required rows="5" value={formData.message} onChange={handleInputChange} placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
