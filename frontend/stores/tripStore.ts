import { create } from 'zustand';
import { Trip } from '../types/trip';

interface TripStoreState {
    trips: Trip[];
    isLoading: boolean;
    error: string | null;
    setTrips: (trips: Trip[]) => void;
    addTrip: (trip: Trip) => void;
    updateTrip: (trip: Trip) => void;
    removeTrip: (tripId: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useTripStore = create<TripStoreState>((set) => ({
    trips: [],
    isLoading: false,
    error: null,
    setTrips: (trips) => set({ trips }),
    addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
    updateTrip: (trip) =>
        set((state) => ({
            trips: state.trips.map((t) => (t.id === trip.id ? trip : t)),
        })),
    removeTrip: (tripId) =>
        set((state) => ({
            trips: state.trips.filter((t) => t.id !== tripId),
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));