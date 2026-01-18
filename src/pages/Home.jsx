import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Tag,
  ArrowRight,
  Star,
  CheckCircle2,
  Users
} from 'lucide-react';
import Hero from '../components/Hero';
import QuickBooking from '../components/QuickBooking';
import GlassCard from '../components/ui/GlassCard';
import './Home.css';

const Home = () => {
  const { cars, tours } = useData();
  // const featuredCars = cars.slice(0, 6); // No longer needed as all cars are mapped
  // const featuredTours = tours.slice(0, 3); // No longer needed as all tours are mapped

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="home-wrapper">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. QUICK BOOKING CARD */}
      <section className="container" id="quick-booking">
        <QuickBooking />
      </section>

      {/* 3. SERVICE HIGHLIGHTS */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <h2>Premium Services</h2>
          <p>We provide the best-in-class travel experience for you.</p>
        </div>
        <motion.div
          className="highlights-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { icon: <Clock />, title: "24/7 Availability", desc: "Round the clock booking and support for your convenience." },
            { icon: <ShieldCheck />, title: "Verified Drivers", desc: "Professional and backgrounds verified drivers for your safety." },
            { icon: <Tag />, title: "Fixed Pricing", desc: "No hidden costs. Pay exactly what you see during booking." }
          ].map((h, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="highlight-card">
                <div className="highlight-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. CAR FLEET PREVIEW */}
      <section className="section-padding container">
        <div className="section-header">
          <div className="flex-between">
            <div>
              <h2>Our Fleet</h2>
              <p className="sub-heading">Premium vehicles for every journey</p>
            </div>
            <Link to="/gallery" className="view-all-link">View All <ArrowRight size={18} /></Link>
          </div>
        </div>
        <div className="fleet-carousel">
          {cars.map(car => (
            <div key={car.id} className="fleet-card carousel-item">
              <div className="fleet-img-wrap">
                {/* Badges could go here if needed */}
                <span className="car-type-badge">{car.type || 'Sedan'}</span>
                <img src={car.images[0]} alt={car.name} />
              </div>
              <div className="fleet-info">
                <h3>{car.name}</h3>
                <div className="fleet-meta">
                  <Users size={16} /> {car.capacity} Passengers
                </div>
                <a
                  href={`https://wa.me/919111961561?text=${encodeURIComponent(`Hi, I am interested in booking ${car.name}. Please provide details.`)}`}
                  className="view-details-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <h2>How It Works</h2>
          <p>Book your ride in 3 simple steps.</p>
        </div>
        <div className="steps-grid">
          {[
            { step: "01", title: "Choose Your Ride", desc: "Select from our premium fleet of sedans, SUVs, or luxury cars." },
            { step: "02", title: "Book Instantly", desc: "Fill in your details and confirm your booking in seconds." },
            { step: "03", title: "Enjoy Your Trip", desc: "Our driver will arrive at your location on time. Have a safe journey!" }
          ].map((s, i) => (
            <GlassCard key={i} className="step-card">
              <div className="step-number">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 5. TOUR PACKAGES PREVIEW */}
      <section className="section-padding container bg-offset">
        <div className="section-header text-center">
          <h2>Tour Packages</h2>
          <p className="sub-heading">Curated experiences for memorable journeys</p>
        </div>
        <div className="tours-carousel">
          {tours.length === 0 ? (
            <div className="empty-state glass full-row">
              <p>No tour packages available at the moment.</p>
            </div>
          ) : (
            tours.map(tour => (
              <div key={tour.id} className="tour-card-new carousel-item">
                <div className="tour-img-wrap-new">
                  <img src={tour.image} alt={tour.name} />
                  <div className="tour-overlay-gradient">
                    <h3>{tour.name}</h3>
                    <span className="tour-loc">{tour.destination}</span>
                  </div>
                </div>
                <div className="tour-body-new">
                  <div className="tour-meta-new">
                    <Clock size={16} /> {tour.duration}
                  </div>
                  <p className="tour-desc-new">{tour.description}</p>
                  <a
                    href={`https://wa.me/919111961561?text=${encodeURIComponent(`Hi, I am interested in booking the tour: ${tour.name}. Please provide details.`)}`}
                    className="enquire-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="center-btn-wrap mt-40">
          <Link to="/tours" className="btn-primary">View All Tours <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <h2>Why Choose Sandeep Travels?</h2>
          <p>The preferred choice for seamless travel across Central India.</p>
        </div>
        <div className="why-grid">
          {[
            "Punctual & Reliable Service",
            "Luxury & Clean Vehicles",
            "Professional Trained Drivers",
            "Round the Clock Support",
            "Flexible Cancellation Policy",
            "Competitive Pricing"
          ].map((item, i) => (
            <div key={i} className="why-card">
              <CheckCircle2 className="text-blue" size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <h2>What Our Travelers Say</h2>
        </div>
        <div className="testimonials-grid">
          {[
            { name: "Rahul S.", text: "Best cab service in Indore. The car was clean and the driver was very professional.", role: "Corporate Traveler" },
            { name: "Priya M.", text: "Booked a Ujjain Mahakal tour package last weekend. Everything was perfectly managed!", role: "Family Vacation" }
          ].map((t, i) => (
            <GlassCard key={i} className="testimonial-card">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p>"{t.text}"</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="section-padding container text-center">
        <motion.div
          className="final-cta-card"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Journey?</h2>
          <p>Book your premium cab now and experience the difference with Sandeep Travels & Holidays.</p>
          <div className="flex-center gap-16 wrap">
            <a href="#quick-booking" className="btn-accent btn-lg">Book a Cab Now</a>
            <Link to="/contact" className="btn-glass btn-lg">Contact Sales</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
