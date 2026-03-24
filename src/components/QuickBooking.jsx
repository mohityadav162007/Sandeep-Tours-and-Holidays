import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Car, User, Phone, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuickBooking.css';

const QuickBooking = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        pickup: '',
        drop: '',
        dateTime: '',
        cabType: 'Sedan (4 Seater)',
        customer_name: '',
        customer_phone: '',
        special_details: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        // Construct query parameters
        const params = new URLSearchParams({
            type: 'cab',
            pickup: formData.pickup,
            drop: formData.drop,
            date: formData.dateTime ? formData.dateTime.split('T')[0] : '',
            time: formData.dateTime ? formData.dateTime.split('T')[1] : '',
            name: formData.customer_name,
            phone: formData.customer_phone,
            cab: formData.cabType,
            details: formData.special_details
        });
        navigate(`/booking?${params.toString()}`);
    };

    return (
        <div className="quick-booking-container container">
            <div className="quick-booking-card glass animate-fade-in">
                <div className="booking-field">
                    <label><MapPin size={16} /> Pickup</label>
                    <input
                        type="text"
                        name="pickup"
                        value={formData.pickup}
                        onChange={handleInputChange}
                        placeholder="Enter Location"
                        required
                    />
                </div>

                <div className="booking-field">
                    <label><MapPin size={16} /> Drop</label>
                    <input
                        type="text"
                        name="drop"
                        value={formData.drop}
                        onChange={handleInputChange}
                        placeholder="Enter Destination"
                        required
                    />
                </div>

                <div className="booking-field">
                    <label><Calendar size={16} /> Date & Time</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="booking-field">
                    <label><Car size={16} /> Cab Type</label>
                    <select
                        name="cabType"
                        value={formData.cabType}
                        onChange={handleInputChange}
                    >
                        <option>Sedan (4 Seater)</option>
                        <option>SUV (6 Seater)</option>
                        <option>Tempo Traveller</option>
                    </select>
                </div>

                <button
                    onClick={handleInitialSubmit}
                    className="btn-glass btn-primary booking-submit"
                >
                    Book Now
                </button>
            </div>

            {/* Step 2 Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="booking-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="booking-modal-card glass"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <X size={24} />
                            </button>

                            <div className="modal-header">
                                <h2>Complete Your Booking</h2>
                                <p>Just a few more details to confirm your ride.</p>
                            </div>

                            <form onSubmit={handleFinalSubmit} className="modal-form">
                                <div className="modal-field">
                                    <label><User size={18} /> Full Name</label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        value={formData.customer_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className="modal-field">
                                    <label><Phone size={18} /> Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="customer_phone"
                                        value={formData.customer_phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 XXXX XXX XXX"
                                        required
                                    />
                                </div>

                                <div className="modal-field">
                                    <label>Additional Details (Optional)</label>
                                    <textarea
                                        name="special_details"
                                        value={formData.special_details}
                                        onChange={handleInputChange}
                                        placeholder="Any special requests or instructions?"
                                        rows="3"
                                    />
                                </div>

                                <button type="submit" className="btn-primary w-full mt-10">
                                    Proceed to Confirmation <ArrowRight size={18} />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuickBooking;
