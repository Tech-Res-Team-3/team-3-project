import { useAddressStore } from '../../stores/addressStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';

export function useAddresses() {
    const {
        addresses,
        setAddresses,
        addAddress,
        updateAddress,
        removeAddress,
        setLoading,
        setError,
    } = useAddressStore();

    // Fetch all addresses (admin)
    const fetchAllAddresses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get('/addresses');
            // setAddresses(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch addresses');
        } finally {
            setLoading(false);
        }
    }, [setAddresses, setLoading, setError]);

    // Fetch addresses for current user
    const fetchUserAddresses = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get(`/users/${userId}/addresses`);
            // setAddresses(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user addresses');
        } finally {
            setLoading(false);
        }
    }, [setAddresses, setLoading, setError]);

    return {
        addresses,
        fetchAllAddresses,
        fetchUserAddresses,
        addAddress,
        updateAddress,
        removeAddress,
    };
}