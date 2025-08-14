import { create } from 'zustand';

export interface User {
    id: number;
    firebaseUid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phone?: string | null;
    photoUrl?: string | null;
    createdAt?: Date;
    rating?: number;
    tripsCompleted?: number;
    verifiedDriver?: boolean;
    // ...add other fields as needed
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) =>
        set({
            user: {
                ...user,
                createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
            },
        }),
    clearUser: () => set({ user: null }),
    setLoading: (isLoading) => set({ isLoading }),
}));