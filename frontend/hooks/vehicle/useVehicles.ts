import { useVehicleStore } from '../../stores/vehicleStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';
import { Vehicle } from '../../types/vehicle';

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
            const res = await axios.get('/vehicles');
            setVehicles(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
    }, [setVehicles, setLoading, setError]);

    // Fetch vehicles for current user
    const fetchUserVehicles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('/vehicles/myVehicles');
            setVehicles(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user vehicles');
        } finally {
            setLoading(false);
        }
    }, [setVehicles, setLoading, setError]);

    // Add a new vehicle
    const addVehicleAsync = useCallback(
        async (vehicle: Partial<Vehicle>) => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.post('/vehicles', vehicle);
                addVehicle(res.data);
                return res.data;
            } catch (err: any) {
                setError(err.message || 'Failed to add vehicle');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [addVehicle, setLoading, setError]
    );

    // Remove a vehicle
    const removeVehicleAsync = useCallback(
        async (vehicleId: number) => {
            setLoading(true);
            setError(null);
            try {
                await axios.delete(`/vehicles/${vehicleId}`);
                removeVehicle(vehicleId);
            } catch (err: any) {
                setError(err.message || 'Failed to remove vehicle');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [removeVehicle, setLoading, setError]
    );

    // Fetch vehicles within a radius of a point
    const fetchVehiclesNearby = useCallback(
        async (lat: number, lng: number, radius: number) => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(
                    `/vehicles/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
                );
                // Normalize: flatten { vehicle, address } into a single Vehicle object
                const normalized: Vehicle[] = res.data.map((item: any) => ({
                    ...item.vehicle,
                    address: item.address,
                }));
                setVehicles(normalized);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch nearby vehicles');
                console.error('Error in findVehiclesNearby:', err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [setVehicles, setLoading, setError]
    );

    return {
        vehicles,
        fetchAllVehicles,
        fetchUserVehicles,
        fetchVehiclesNearby,
        addVehicleAsync,
        addVehicle,
        updateVehicle,
        removeVehicleAsync,
        removeVehicle,
    };
}