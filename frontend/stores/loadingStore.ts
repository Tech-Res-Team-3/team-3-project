import { create } from "zustand";

export const useLoadingStore = create<{
    loading: boolean;
    setLoading: (loading: boolean) => void;
}>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));