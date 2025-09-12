import { create } from 'zustand';
import { User } from '../types/user';

interface UserStoreState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    removeUser: (userId: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    setUsers: (users) => set({ users }),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    updateUser: (user) =>
        set((state) => {
            console.log("Zustand updateUser called with:", user);
            return {
                users: state.users.map((u) => (u.id === user.id ? user : u)),
            };
        }),
    removeUser: (userId) =>
        set((state) => ({
            users: state.users.filter((u) => u.id !== userId),
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));