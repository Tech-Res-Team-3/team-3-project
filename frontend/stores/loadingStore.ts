import { create } from "zustand";

export const useLoadingStore = create<{
    loading: boolean;
    lastUpdated: number;
    setLoading: (loading: boolean) => void;
}>((set, get) => ({
    loading: false,
    lastUpdated: 0,
    setLoading: (loading) => {
        const currentLoading = get().loading;
        if (currentLoading !== loading) {
            console.log(`Loading state changed: ${currentLoading} -> ${loading}`);
            set({ loading, lastUpdated: Date.now() });
        }
    },
}));