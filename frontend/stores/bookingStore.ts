import { create } from 'zustand';
import { Booking } from '../types/booking';

interface BookingStoreState {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    setBookings: (bookings: Booking[]) => void;
    addBooking: (booking: Booking) => void;
    updateBooking: (booking: Booking) => void;
    removeBooking: (bookingId: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useBookingStore = create<BookingStoreState>((set) => ({
    bookings: [],
    isLoading: false,
    error: null,
    setBookings: (bookings) => set({ bookings }),
    addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
    updateBooking: (booking) =>
        set((state) => ({
            bookings: state.bookings.map((b) => (b.id === booking.id ? booking : b)),
        })),
    removeBooking: (bookingId) =>
        set((state) => ({
            bookings: state.bookings.filter((b) => b.id !== bookingId),
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));