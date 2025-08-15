import { create } from "zustand";

interface ProfileCompleteState {
    profileComplete: boolean;
    setProfileComplete: (value: boolean) => void;
    toggleProfileComplete: () => void;
}

export const useProfileCompleteStore = create<ProfileCompleteState>((set) => ({
    profileComplete: false, // default value
    setProfileComplete: (value) => set({ profileComplete: value }),
    toggleProfileComplete: () =>
        set((state) => ({ profileComplete: !state.profileComplete })),
}));