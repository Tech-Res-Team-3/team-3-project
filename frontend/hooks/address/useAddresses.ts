import { useAddressStore } from '../../stores/addressStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';
import { Address } from '../../types/address';

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

    const addAddressAsync = useCallback(
        async (address: Partial<Address> & { label?: string }) => {
            setLoading(true);
            setError(null);
            try {
                // Omit UI-only fields like 'label'
                const { label, ...addressToSend } = address;
                const res = await axios.post('/addresses', addressToSend);
                addAddress(res.data); // Update Zustand store
                return res.data;
            } catch (err: any) {
                setError(err.message || 'Failed to add address');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [addAddress, setLoading, setError]
    );

    return {
        addresses,
        fetchAllAddresses,
        fetchUserAddresses,
        addAddressAsync,
        addAddress,
        updateAddress,
        removeAddress,
    };
}