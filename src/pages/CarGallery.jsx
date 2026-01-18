import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Users, Info } from 'lucide-react';
import './Gallery.css';

const CarGallery = () => {
  const { cars } = useData();
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  };

  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }));
  };

  return (
    <div className="gallery-page">
      <div className="container section-padding">
        <div className="gallery-header animate-fade-in">
          <h1>Our Premium Fleet</h1>
          <p>Handpicked vehicles for ultimate comfort and safety.</p>
        </div>

        <div className="fleet-grid">
          {cars.map(car => (
            <div key={car.id} className="fleet-card animate-fade-in">
              <div className="fleet-img-wrap">
                <span className="car-type-badge">{car.type || 'Premium'}</span>
                <img src={car.images[0]} alt={car.name} />
              </div>

              <div className="fleet-info">
                <h3>{car.name}</h3>
                <div className="fleet-meta">
                  <Users size={16} /> {car.capacity} Passengers
                </div>
                <p className="car-card-desc">{car.description}</p>

                <div className="mini-image-grid mt-12">
                  {car.images.slice(0, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="mini-img-wrap"
                      onClick={() => openLightbox(car.images, idx)}
                    >
                      <img src={img} alt="preview" />
                      {idx === 3 && car.images.length > 4 && (
                        <div className="more-overlay">+{car.images.length - 4}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex-between mt-20">
                  <Link to={`/booking?type=car&id=${car.id}`} className="btn-primary btn-small">
                    Book Now
                  </Link>
                  <button
                    onClick={() => openLightbox(car.images, 0)}
                    className="view-gallery-btn"
                  >
                    View All Photos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cars.length === 0 && (
          <div className="empty-state glass">
            <p>No vehicles found.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="close-btn" onClick={closeLightbox}><X size={32} /></button>

          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="nav-btn prev" onClick={prevImage}><ChevronLeft size={40} /></button>
            <div className="lightbox-image-container">
              <img src={lightbox.images[lightbox.index]} alt="Large view" />
              <div className="lightbox-counter">
                {lightbox.index + 1} / {lightbox.images.length}
              </div>
            </div>
            <button className="nav-btn next" onClick={nextImage}><ChevronRight size={40} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarGallery;
