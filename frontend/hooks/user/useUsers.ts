import { useUserStore } from '../../stores/userStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';
import { User } from '../../types/user';

export function useUsers() {
    const {
        users,
        setUsers,
        addUser,
        updateUser: updateUserInStore,
        removeUser,
        setLoading,
        setError,
    } = useUserStore();

    // Fetch all users (admin)
    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('/users');
            setUsers(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, [setUsers, setLoading, setError]);

    // Update user in backend and Zustand
    const updateUser = useCallback(async (patch: Partial<User>) => {
        setLoading(true);
        setError(null);
        try {
            console.log("PATCH /users payload:", patch);
            const res = await axios.patch('/users', patch);
            console.log("PATCH /users response:", res.data);
            updateUserInStore(res.data);
            return res.data;
        } catch (err: any) {
            console.log("PATCH /users error:", err);
            setError(err.message || 'Failed to update user');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [updateUserInStore, setLoading, setError]);

    return {
        users,
        fetchAllUsers,
        addUser,
        updateUser,
        removeUser,
    };
}