import { useTripStore } from '../../stores/tripStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';

export function useTrips() {
    const {
        trips,
        setTrips,
        addTrip,
        updateTrip,
        removeTrip,
        setLoading,
        setError,
    } = useTripStore();

    // Fetch all trips (admin)
    const fetchAllTrips = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get('/trips');
            // setTrips(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch trips');
        } finally {
            setLoading(false);
        }
    }, [setTrips, setLoading, setError]);

    // Fetch trips for current user
    const fetchUserTrips = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get(`/users/${userId}/trips`);
            // setTrips(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user trips');
        } finally {
            setLoading(false);
        }
    }, [setTrips, setLoading, setError]);

    return {
        trips,
        fetchAllTrips,
        fetchUserTrips,
        addTrip,
        updateTrip,
        removeTrip,
    };
}