import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [tours, setTours] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Cars
                const { data: carsData, error: carsError } = await supabase
                    .from('cars')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (carsError) console.error('Error fetching cars:', carsError);
                else setCars(carsData || []);

                // Fetch Tours
                const { data: toursData, error: toursError } = await supabase
                    .from('tours')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (toursError) console.error('Error fetching tours:', toursError);
                else setTours(toursData || []);

                // Fetch Bookings (Only if admin, but safe to fetch pending RLS)
                // Actually, for public site we might not need bookings, but admin does.
                // We'll fetch them, failing gracefully if RLS blocks it (which is good).
                const { data: bookingsData, error: bookingsError } = await supabase
                    .from('bookings')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!bookingsError) setBookings(bookingsData || []);

            } catch (error) {
                console.error('Unexpected error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Optional: Realtime subscriptions could go here
    }, []);

    const addCar = async (car) => {
        try {
            // Remove id if it's a timestamp (let Postgres handle IDs)
            const { id, ...carData } = car;
            const { data, error } = await supabase
                .from('cars')
                .insert([{ ...carData, is_active: true }])
                .select();

            if (error) throw error;
            if (data) setCars([data[0], ...cars]);
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Failed to add car. Check console.');
        }
    };

    const deleteCar = async (id) => {
        try {
            const { error } = await supabase.from('cars').delete().eq('id', id);
            if (error) throw error;
            setCars(cars.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const addTour = async (tour) => {
        try {
            const { id, ...tourData } = tour;
            const { data, error } = await supabase
                .from('tours')
                .insert([{ ...tourData, is_active: true }])
                .select();

            if (error) throw error;
            if (data) setTours([data[0], ...tours]);
        } catch (error) {
            console.error('Error adding tour:', error);
            alert('Failed to add tour.');
        }
    };

    const deleteTour = async (id) => {
        try {
            const { error } = await supabase.from('tours').delete().eq('id', id);
            if (error) throw error;
            setTours(tours.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
    };

    const addBooking = async (booking) => {
        try {
            const { id, ...bookingData } = booking;
            const { data, error } = await supabase
                .from('bookings')
                .insert([{ ...bookingData, status: 'pending' }])
                .select();

            if (error) throw error;
            if (data) setBookings([data[0], ...bookings]);
            alert('Booking request sent successfully!');
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please try again.');
        }
    };

    const updateBookingStatus = async (id, status) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <DataContext.Provider value={{
            cars,
            tours,
            bookings,
            addCar,
            deleteCar,
            addTour,
            deleteTour,
            addBooking,
            updateBookingStatus,
            loading
        }}>
            {children}
        </DataContext.Provider>
    );
};

