import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
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

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }));
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextImage();
    } else if (info.offset.x > threshold) {
      prevImage();
    }
  };

  return (
    <div className="gallery-page">
      <SEO
        title="Our Premium Fleet | Sandeep Tours & Holidays"
        description="View our wide range of premium vehicles, including luxury sedans, SUVs, and tempo travellers. Perfect for all your travel requirements in India."
        keywords="car gallery, luxury cars, travel fleet, hire SUV, sedan for rent, travel agency cars"
      />
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
                <img src={car.images[0]} alt={`${car.name} ${car.type || 'Premium'} tour package India`} title={`${car.name} available for India tours`} loading="lazy" />
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
                      <img src={img} alt={`${car.name} interior - ${car.type || 'Premium'} tour package India view ${idx + 1}`} title="View enlargement" loading="lazy" />
                      {idx === 3 && car.images.length > 4 && (
                        <div className="more-overlay">+{car.images.length - 4}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex-between mt-20">
                  <a
                    href={`https://wa.me/919111961561?text=${encodeURIComponent(`Hi, I am interested in booking ${car.name} from the gallery. Please provide details.`)}`}
                    className="btn-primary btn-small"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </a>
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
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="close-btn" onClick={closeLightbox}><X size={32} /></button>

            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="nav-btn prev desktop-only" onClick={prevImage} aria-label="Previous image">
                <ChevronLeft size={48} />
              </button>

              <div className="lightbox-image-container">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightbox.index}
                    src={lightbox.images[lightbox.index]}
                    alt={`Vehicle ${lightbox.index + 1}`}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    className="swipeable-img"
                  />
                </AnimatePresence>

                <div className="lightbox-counter">
                  {lightbox.index + 1} / {lightbox.images.length}
                </div>
              </div>

              <button className="nav-btn next desktop-only" onClick={nextImage} aria-label="Next image">
                <ChevronRight size={48} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarGallery;
