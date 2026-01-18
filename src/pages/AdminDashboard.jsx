import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { List, Car, Map, LogOut, Loader2, Plus, Phone, MapPin, Calendar, Trash2 } from 'lucide-react';
import { uploadToCloudinary } from '../utils/cloudinary';
import { supabase } from '../lib/supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { cars, tours, bookings, addCar, addTour, updateBookingStatus, deleteCar, deleteTour } = useData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');
    const [isUploading, setIsUploading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Auth Check
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/secret'); // Redirect to login
            }
            setIsCheckingAuth(false);
        };

        checkAuth();
    }, [navigate]);

    // Form States
    const [newCar, setNewCar] = useState({ name: '', capacity: 4, description: '', images: [''], features: [''], type: 'Sedan' });
    const [newTour, setNewTour] = useState({ name: '', destination: '', duration: '', description: '', image: '', highlights: [''] });

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/'); // Go home or login
    };

    const handleStatusUpdate = (id, newStatus) => {
        updateBookingStatus(id, newStatus);
    };

    const handleImageUpload = async (file, type) => {
        setIsUploading(true);
        try {
            // Check if file is valid
            if (!file) return;
            const url = await uploadToCloudinary(file);
            if (type === 'car') {
                setNewCar(prev => ({ ...prev, images: [url] }));
            } else if (type === 'tour') {
                setNewTour(prev => ({ ...prev, image: url }));
            }
        } catch (error) {
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleAddCar = async (e) => {
        e.preventDefault();
        // ID is handled by Supabase
        await addCar({ ...newCar });
        setNewCar({ name: '', capacity: 4, description: '', images: [''], features: [''], type: 'Sedan' });
        alert('Car added!');
    }

    const handleAddTour = async (e) => {
        e.preventDefault();
        await addTour({ ...newTour });
        setNewTour({ name: '', destination: '', duration: '', description: '', image: '', highlights: [''] });
        alert('Tour added!');
    }

    if (isCheckingAuth) {
        return <div className="loading-screen"><Loader2 className="spin" /> Verifying...</div>;
    }

    return (
        <div className="admin-layout">
            <header className="admin-top-bar mobile-only">
                <div className="admin-brand">
                    <h2>Sandeep <span>Travels</span></h2>
                </div>
                <button onClick={handleLogout} className="logout-icon-btn">
                    <LogOut size={20} />
                </button>
            </header>

            <aside className="admin-sidebar glass desktop-only">
                <div className="admin-brand">
                    <h2>TravelFlow <span>Admin</span></h2>
                </div>
                <nav className="admin-nav">
                    <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
                        <List size={20} /> <span>Bookings</span>
                    </button>
                    <button className={activeTab === 'cars' ? 'active' : ''} onClick={() => setActiveTab('cars')}>
                        <Car size={20} /> <span>Manage Cars</span>
                    </button>
                    <button className={activeTab === 'tours' ? 'active' : ''} onClick={() => setActiveTab('tours')}>
                        <Map size={20} /> <span>Manage Tours</span>
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} /> <span>Logout</span>
                    </button>
                </nav>
            </aside>

            <nav className="admin-bottom-nav mobile-only glass">
                <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
                    <List size={20} />
                </button>
                <button className={activeTab === 'cars' ? 'active' : ''} onClick={() => setActiveTab('cars')}>
                    <Car size={20} />
                </button>
                <button className={activeTab === 'tours' ? 'active' : ''} onClick={() => setActiveTab('tours')}>
                    <Map size={20} />
                </button>
            </nav>

            <main className="admin-content">
                {activeTab === 'bookings' && (
                    <div className="admin-section animate-fade-in">
                        <div className="section-header-admin">
                            <h1>Bookings Management</h1>
                            <p>Track and update trip requests.</p>
                        </div>

                        <div className="bookings-grid-admin">
                            {bookings.length === 0 ? <p className="empty-state">No bookings found.</p> : (
                                [...bookings].map(b => (
                                    <div key={b.id} className={`booking-admin-card glass ${b.status}`}>
                                        <div className="card-top">
                                            <span className={`status-pill ${b.status}`}>{b.status}</span>
                                            <span className="booking-type-label">{b.booking_type}</span>
                                        </div>
                                        <div className="card-body">
                                            <h3>{b.customer_name}</h3>
                                            <p className="phone"><Phone size={14} /> {b.customer_phone}</p>
                                            <div className="trip-meta">
                                                <div className="meta-item">
                                                    <MapPin size={14} />
                                                    <p><strong>From:</strong> {b.pickup_location}</p>
                                                </div>
                                                {b.booking_type === 'cab' && (
                                                    <div className="meta-item">
                                                        <MapPin size={14} />
                                                        <p><strong>To:</strong> {b.drop_location}</p>
                                                    </div>
                                                )}
                                                <div className="meta-item">
                                                    <Calendar size={14} />
                                                    <p>{b.travel_date} at {b.travel_time}</p>
                                                </div>
                                            </div>
                                            {b.special_requests && (
                                                <div className="requests-box">
                                                    <strong>Notes:</strong> {b.special_requests}
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-actions">
                                            <select
                                                value={b.status}
                                                onChange={(e) => handleStatusUpdate(b.id, e.target.value)}
                                                className="status-select"
                                            >
                                                <option value="pending">Mark Pending</option>
                                                <option value="confirmed">Confirm Booking</option>
                                                <option value="completed">Mark Completed</option>
                                                <option value="cancelled">Cancel Booking</option>
                                            </select>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'cars' && (
                    <div className="admin-section animate-fade-in">
                        <div className="section-header-admin">
                            <h1>Fleet Management</h1>
                            <p>Add or remove vehicles from the gallery.</p>
                        </div>

                        <div className="admin-form-wrap glass">
                            <h3>Add New Vehicle</h3>
                            <form className="admin-form" onSubmit={handleAddCar}>
                                <div className="admin-form-grid">
                                    <input type="text" placeholder="Car Name" value={newCar.name} onChange={e => setNewCar({ ...newCar, name: e.target.value })} required />
                                    <input type="number" placeholder="Seats" value={newCar.capacity} onChange={e => setNewCar({ ...newCar, capacity: parseInt(e.target.value) })} required />
                                    <select value={newCar.type} onChange={e => setNewCar({ ...newCar, type: e.target.value })} className="glass-select">
                                        <option value="Sedan">Sedan</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="Tempo">Tempo Traveller</option>
                                    </select>
                                    <textarea placeholder="Description" className="full-row" value={newCar.description} onChange={e => setNewCar({ ...newCar, description: e.target.value })} required />

                                    <div className="full-row file-upload-group">
                                        <label className="upload-label">
                                            {isUploading ? <Loader2 className="spin" size={20} /> : <Plus size={20} />}
                                            {newCar.images[0] ? 'Change Image' : 'Upload Image'}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e.target.files[0], 'car')}
                                                hidden
                                            />
                                        </label>
                                        {newCar.images[0] && <div className="preview-thumb"><img src={newCar.images[0]} alt="Preview" /></div>}
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary" disabled={isUploading || !newCar.images[0]}>
                                    {isUploading ? 'Uploading...' : <><Plus size={18} /> Add Vehicle</>}
                                </button>
                            </form>
                        </div>

                        <div className="items-list-admin">
                            {cars.map(car => (
                                <div key={car.id} className="admin-item-row glass">
                                    <img src={car.images[0]} alt={car.name} />
                                    <div className="item-info">
                                        <h4>{car.name}</h4>
                                        <p>{car.capacity} Seats • {car.type || 'Standard'}</p>
                                    </div>
                                    <button className="trash-btn" onClick={() => deleteCar(car.id)}><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'tours' && (
                    <div className="admin-section animate-fade-in">
                        <div className="section-header-admin">
                            <h1>Tour Packages</h1>
                            <p>Manage destinations and duration.</p>
                        </div>

                        <div className="admin-form-wrap glass">
                            <h3>Create New Tour</h3>
                            <form className="admin-form" onSubmit={handleAddTour}>
                                <div className="admin-form-grid">
                                    <input type="text" placeholder="Tour Name" value={newTour.name} onChange={e => setNewTour({ ...newTour, name: e.target.value })} required />
                                    <input type="text" placeholder="Destination" value={newTour.destination} onChange={e => setNewTour({ ...newTour, destination: e.target.value })} required />
                                    <input type="text" placeholder="Duration (e.g. 2 Days / 1 Night)" value={newTour.duration} onChange={e => setNewTour({ ...newTour, duration: e.target.value })} required />
                                    <textarea placeholder="Tour Description" className="full-row" value={newTour.description} onChange={e => setNewTour({ ...newTour, description: e.target.value })} required />

                                    <div className="full-row file-upload-group">
                                        <label className="upload-label">
                                            {isUploading ? <Loader2 className="spin" size={20} /> : <Plus size={20} />}
                                            {newTour.image ? 'Change Image' : 'Upload Cover Image'}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e.target.files[0], 'tour')}
                                                hidden
                                            />
                                        </label>
                                        {newTour.image && <div className="preview-thumb"><img src={newTour.image} alt="Preview" /></div>}
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary" disabled={isUploading || !newTour.image}>
                                    {isUploading ? 'Uploading...' : <><Plus size={18} /> Create Package</>}
                                </button>
                            </form>
                        </div>

                        <div className="items-list-admin">
                            {tours.map(tour => (
                                <div key={tour.id} className="admin-item-row glass">
                                    <img src={tour.image} alt={tour.name} />
                                    <div className="item-info">
                                        <h4>{tour.name}</h4>
                                        <p>{tour.destination} • {tour.duration}</p>
                                    </div>
                                    <button className="trash-btn" onClick={() => deleteTour(tour.id)}><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
