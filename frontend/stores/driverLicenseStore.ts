import { create } from 'zustand';
import { DriverLicense } from '../types/driverLicense';

interface DriverLicenseStoreState {
    driverLicenses: DriverLicense[];
    isLoading: boolean;
    error: string | null;
    setDriverLicenses: (driverLicenses: DriverLicense[]) => void;
    addDriverLicense: (driverLicense: DriverLicense) => void;
    updateDriverLicense: (driverLicense: DriverLicense) => void;
    removeDriverLicense: (driverLicenseId: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useDriverLicenseStore = create<DriverLicenseStoreState>((set) => ({
    driverLicenses: [],
    isLoading: false,
    error: null,
    setDriverLicenses: (driverLicenses) => set({ driverLicenses }),
    addDriverLicense: (driverLicense) => set((state) => ({ driverLicenses: [...state.driverLicenses, driverLicense] })),
    updateDriverLicense: (driverLicense) =>
        set((state) => ({
            driverLicenses: state.driverLicenses.map((d) => (d.id === driverLicense.id ? driverLicense : d)),
        })),
    removeDriverLicense: (driverLicenseId) =>
        set((state) => ({
            driverLicenses: state.driverLicenses.filter((d) => d.id !== driverLicenseId),
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));