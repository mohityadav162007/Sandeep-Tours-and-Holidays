import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Car, Map, CheckCircle, ArrowLeft, Send, Users, Calendar, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Booking.css';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cars, tours, addBooking } = useData();

  const typeParam = searchParams.get('type') || 'cab';
  const idParam = searchParams.get('id');

  const [bookingType, setBookingType] = useState(typeParam);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    pickup_location: searchParams.get('pickup') || '',
    drop_location: searchParams.get('drop') || '',
    travel_date: searchParams.get('date') || '',
    travel_time: '',
    car_type: idParam && typeParam === 'cab' ? idParam : '',
    tour_id: idParam && typeParam === 'tour' ? idParam : '',
    passengers: 1,
    special_requests: ''
  });

  useEffect(() => {
    if (typeParam) {
      setBookingType(typeParam);
      if (typeParam === 'cab') setFormData(prev => ({ ...prev, car_type: idParam || '' }));
      if (typeParam === 'tour') setFormData(prev => ({ ...prev, tour_id: idParam || '' }));
    }
  }, [typeParam, idParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      booking_type: bookingType,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    addBooking(bookingData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      customer_name: '',
      customer_phone: '',
      customer_email: '',
      pickup_location: '',
      drop_location: '',
      travel_date: '',
      travel_time: '',
      car_type: '',
      tour_id: '',
      passengers: 1,
      special_requests: ''
    });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="booking-page-container">
      <div className="container">
        <motion.div
          className="booking-card-main glass"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="success-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon-wrap">
                  <CheckCircle size={100} color="var(--success)" strokeWidth={1} />
                </div>
                <h2>Booking Received!</h2>
                <p>Thank you for choosing Sandeep Travels & Holidays. Our team will contact you shortly to confirm your trip details.</p>
                <div className="success-actions">
                  <button onClick={resetForm} className="btn-primary">Make Another Booking</button>
                  <button onClick={() => navigate('/')} className="btn-glass">Back to Home</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial="hidden" animate="visible" exit="hidden" variants={formVariants}>
                <div className="booking-header">
                  <h1>{bookingType === 'cab' ? 'Book Your Ride' : 'Reserve Your Tour'}</h1>
                  <p>Experience premium travel with our seamless booking process.</p>
                </div>

                <div className="tabs-switcher">
                  <button
                    className={`tab-btn ${bookingType === 'cab' ? 'active' : ''}`}
                    onClick={() => setBookingType('cab')}
                  >
                    <Car size={20} /> Cab
                  </button>
                  <button
                    className={`tab-btn ${bookingType === 'tour' ? 'active' : ''}`}
                    onClick={() => setBookingType('tour')}
                  >
                    <Map size={20} /> Tour
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="booking-form-premium">
                  <div className="form-section">
                    <div className="section-title">
                      <span className="step-count">1</span>
                      <h3>Personal Information</h3>
                    </div>
                    <div className="form-grid">
                      <div className="input-group">
                        <label>Name</label>
                        <input type="text" name="customer_name" required value={formData.customer_name} onChange={handleInputChange} placeholder="Full Name" />
                      </div>
                      <div className="input-group">
                        <label>Phone</label>
                        <input type="tel" name="customer_phone" required value={formData.customer_phone} onChange={handleInputChange} placeholder="+91 XXXX XXX XXX" />
                      </div>
                      <div className="input-group full-width">
                        <label>Email (Optional)</label>
                        <input type="email" name="customer_email" value={formData.customer_email} onChange={handleInputChange} placeholder="email@example.com" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={bookingType}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="form-section"
                    >
                      <div className="section-title">
                        <span className="step-count">2</span>
                        <h3>Trip Specifics</h3>
                      </div>

                      <div className="form-grid">
                        {bookingType === 'tour' ? (
                          <div className="input-group full-width">
                            <label>Tour Package</label>
                            <select name="tour_id" required value={formData.tour_id} onChange={handleInputChange}>
                              <option value="">Select a Tour</option>
                              {tours.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="input-group full-width">
                            <label>Select Vehicle</label>
                            <select name="car_type" required value={formData.car_type} onChange={handleInputChange}>
                              <option value="">Select Your Vehicle</option>
                              {cars.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div className="input-group">
                          <label><MapPin size={14} /> Pickup</label>
                          <input type="text" name="pickup_location" required value={formData.pickup_location} onChange={handleInputChange} placeholder="Enter pickup address" />
                        </div>

                        {bookingType === 'cab' && (
                          <div className="input-group">
                            <label><MapPin size={14} /> Drop</label>
                            <input type="text" name="drop_location" required value={formData.drop_location} onChange={handleInputChange} placeholder="Destination" />
                          </div>
                        )}

                        <div className="input-group">
                          <label><Calendar size={14} /> Date</label>
                          <input type="date" name="travel_date" required value={formData.travel_date} onChange={handleInputChange} />
                        </div>

                        <div className="input-group">
                          <label><Clock size={14} /> Time</label>
                          <input type="time" name="travel_time" value={formData.travel_time} onChange={handleInputChange} />
                        </div>

                        <div className="input-group">
                          <label><Users size={14} /> Passengers</label>
                          <input type="number" name="passengers" min="1" max="20" value={formData.passengers} onChange={handleInputChange} />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="form-section">
                    <div className="section-title">
                      <span className="step-count">3</span>
                      <h3>Additional Notes</h3>
                    </div>
                    <div className="input-group full-width">
                      <textarea
                        name="special_requests"
                        rows="3"
                        value={formData.special_requests}
                        onChange={handleInputChange}
                        placeholder="Any special instructions or preferences?"
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary full-width-btn">
                    Complete Booking <Send size={18} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
