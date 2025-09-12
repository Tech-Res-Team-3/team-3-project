import { create } from "zustand";
import { Region } from "react-native-maps";

interface MapStoreState {
    region: Region | null;
    setRegion: (region: Region | null) => void;
    pendingRegion: Region | null;
    setPendingRegion: (region: Region | null) => void;
    lastSearch: string;
    setLastSearch: (search: string) => void;
}

export const useMapStore = create<MapStoreState>((set) => ({
    region: null,
    setRegion: (region) => set({ region }),
    pendingRegion: null,
    setPendingRegion: (pendingRegion) => set({ pendingRegion }),
    lastSearch: "",
    setLastSearch: (lastSearch) => set({ lastSearch }),
}));