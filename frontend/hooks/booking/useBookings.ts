import { useBookingStore } from '../../stores/bookingStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';

export function useBookings() {
    const {
        bookings,
        setBookings,
        addBooking,
        updateBooking,
        removeBooking,
        setLoading,
        setError,
    } = useBookingStore();

    // Fetch all bookings (admin)
    const fetchAllBookings = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get('/bookings');
            // setBookings(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    }, [setBookings, setLoading, setError]);

    // Fetch bookings for current user
    const fetchUserBookings = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get(`/users/${userId}/bookings`);
            // setBookings(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user bookings');
        } finally {
            setLoading(false);
        }
    }, [setBookings, setLoading, setError]);

    return {
        bookings,
        fetchAllBookings,
        fetchUserBookings,
        addBooking,
        updateBooking,
        removeBooking,
    };
}