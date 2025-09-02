import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    lastUpdated: number;
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            lastUpdated: 0,
            setUser: (user) => {
                const currentUser = get().user;
                if (
                    currentUser?.id !== user.id ||
                    JSON.stringify(currentUser) !== JSON.stringify(user)
                ) {
                    set({ user, lastUpdated: Date.now() });
                }
            },
            clearUser: () => {
                const currentUser = get().user;
                if (currentUser) {
                    set({ user: null, lastUpdated: Date.now() });
                }
            },
            setLoading: (isLoading) => {
                const currentLoading = get().isLoading;
                if (currentLoading !== isLoading) {
                    set({ isLoading, lastUpdated: Date.now() });
                }
            },
        }),
        {
            name: 'auth-storage', // Unique storage key for AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);