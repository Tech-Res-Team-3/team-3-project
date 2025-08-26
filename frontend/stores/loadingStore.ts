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
            // For immediate updates (like logout), don't defer
            if (!loading) {
                set({ loading, lastUpdated: Date.now() });
            } else {
                // Use requestAnimationFrame only for setting loading to true
                requestAnimationFrame(() => {
                    set({ loading, lastUpdated: Date.now() });
                });
            }
        }
    },
}));