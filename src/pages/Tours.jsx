import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import './Tours.css';

const Tours = () => {
  const { tours } = useData();

  return (
    <div className="tours-page">
      <div className="container section-padding">
        <div className="header-center animate-fade-in">
          <h1>Exclusive Tour Packages</h1>
          <p>Carefully crafted journeys to the most beautiful destinations.</p>
        </div>

        <div className="tours-grid">
          {tours.map(tour => (
            <div key={tour.id} className="tour-card animate-fade-in">
              <div className="tour-image-wrap">
                <img src={tour.image} alt={tour.name} />
                <div className="tour-overlay-top">
                  <span className="price-badge">Featured</span>
                </div>
                <div className="tour-overlay-bottom">
                  <h3>{tour.name}</h3>
                </div>
              </div>

              <div className="tour-info">
                <div className="duration">
                  <Clock size={16} /> {tour.duration} | <MapPin size={14} /> {tour.destination}
                </div>
                <p className="description">{tour.description}</p>

                <div className="highlights-tags">
                  {tour.highlights && tour.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="tag">
                      {h}
                    </span>
                  ))}
                </div>

                <Link to={`/booking?type=tour&id=${tour.id}`} className="btn-primary-underlined-link">
                  Enquire Now <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {tours.length === 0 && (
          <div className="empty-state glass">
            <p>No tour packages found.</p>
          </div>
        )}

        {/* Custom Tour CTA */}
        <div className="custom-tour-cta glass-dark mt-40">
          <div className="cta-content">
            <h2>Looking for a Custom Tour?</h2>
            <p>We can create personalized packages tailored to your specific travel needs and preferences.</p>
          </div>
          <Link to="/contact" className="btn-accent">
            Plan My Trip <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tours;
