import { useDriverLicenseStore } from '../../stores/driverLicenseStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';

export function useDriverLicenses() {
    const {
        driverLicenses,
        setDriverLicenses,
        addDriverLicense,
        updateDriverLicense,
        removeDriverLicense,
        setLoading,
        setError,
    } = useDriverLicenseStore();

    // Fetch all driver licenses (admin)
    const fetchAllDriverLicenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get('/driver-licenses');
            // setDriverLicenses(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch driver licenses');
        } finally {
            setLoading(false);
        }
    }, [setDriverLicenses, setLoading, setError]);

    // Fetch driver licenses for current user
    const fetchUserDriverLicenses = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get(`/users/${userId}/driver-licenses`);
            // setDriverLicenses(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user driver licenses');
        } finally {
            setLoading(false);
        }
    }, [setDriverLicenses, setLoading, setError]);

    return {
        driverLicenses,
        fetchAllDriverLicenses,
        fetchUserDriverLicenses,
        addDriverLicense,
        updateDriverLicense,
        removeDriverLicense,
    };
}