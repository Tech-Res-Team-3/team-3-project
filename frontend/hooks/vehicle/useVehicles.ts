import { useVehicleStore } from '../../stores/vehicleStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';

export function useVehicles() {
    const {
        vehicles,
        setVehicles,
        addVehicle,
        updateVehicle,
        removeVehicle,
        setLoading,
        setError,
    } = useVehicleStore();

    // Fetch all vehicles (admin)
    const fetchAllVehicles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get('/vehicles');
            // setVehicles(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
    }, [setVehicles, setLoading, setError]);

    // Fetch vehicles for current user
    const fetchUserVehicles = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get(`/users/${userId}/vehicles`);
            // setVehicles(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user vehicles');
        } finally {
            setLoading(false);
        }
    }, [setVehicles, setLoading, setError]);

    return {
        vehicles,
        fetchAllVehicles,
        fetchUserVehicles,
        addVehicle,
        updateVehicle,
        removeVehicle,
    };
}