import { useUserStore } from '../../stores/userStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';

export function useUsers() {
    const {
        users,
        setUsers,
        addUser,
        updateUser,
        removeUser,
        setLoading,
        setError,
    } = useUserStore();

    // Fetch all users (admin)
    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get('/users');
            // setUsers(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, [setUsers, setLoading, setError]);

    // Fetch users for current user (if needed)
    // For most apps, this is not needed, but you can add logic here if your backend supports it

    return {
        users,
        fetchAllUsers,
        addUser,
        updateUser,
        removeUser,
    };
}