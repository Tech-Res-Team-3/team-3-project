import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    lastUpdated: number; // Add timestamp to track state changes
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    lastUpdated: 0,
    setUser: (user) => {
        // Only update if user is different to prevent unnecessary re-renders
        const currentUser = get().user;
        if (currentUser?.id !== user.id || JSON.stringify(currentUser) !== JSON.stringify(user)) {
            // Direct update - no need for requestAnimationFrame since this is called from async callbacks
            set({ user, lastUpdated: Date.now() });
        }
    },
    clearUser: () => {
        // Only clear if user exists to prevent unnecessary re-renders
        const currentUser = get().user;
        if (currentUser) {
            // Clear user immediately for logout - don't defer this
            set({ user: null, lastUpdated: Date.now() });
        }
    },
    setLoading: (isLoading) => {
        // Only update if loading state is different
        const currentLoading = get().isLoading;
        if (currentLoading !== isLoading) {
            set({ isLoading, lastUpdated: Date.now() });
        }
    },
}));