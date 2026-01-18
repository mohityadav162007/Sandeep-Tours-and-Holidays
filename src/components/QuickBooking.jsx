import React from 'react';
import { MapPin, Calendar, Car } from 'lucide-react';
import './QuickBooking.css';

const QuickBooking = () => {
    return (
        <div className="quick-booking-container container">
            <div className="quick-booking-card glass animate-fade-in">
                <div className="booking-field">
                    <label><MapPin size={16} /> Pickup</label>
                    <input type="text" placeholder="Enter Location" />
                </div>

                <div className="booking-field">
                    <label><MapPin size={16} /> Drop</label>
                    <input type="text" placeholder="Enter Destination" />
                </div>

                <div className="booking-field">
                    <label><Calendar size={16} /> Date & Time</label>
                    <input type="datetime-local" />
                </div>

                <div className="booking-field">
                    <label><Car size={16} /> Cab Type</label>
                    <select>
                        <option>Sedan (4 Seater)</option>
                        <option>SUV (6 Seater)</option>
                        <option>Tempo Traveller</option>
                    </select>
                </div>

                <button className="btn-glass btn-primary booking-submit">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default QuickBooking;
