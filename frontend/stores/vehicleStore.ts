import { create } from 'zustand';
import { Vehicle } from '../types/vehicle';

interface VehicleStoreState {
    vehicles: Vehicle[];
    vehicleDraft: Partial<Vehicle> | null;
    isLoading: boolean;
    error: string | null;
    setVehicles: (vehicles: Vehicle[]) => void;
    addVehicle: (vehicle: Vehicle) => void;
    updateVehicle: (vehicle: Vehicle) => void;
    removeVehicle: (vehicleId: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setVehicleDraft: (draft: Partial<Vehicle>) => void;
    clearVehicleDraft: () => void;
}

export const useVehicleStore = create<VehicleStoreState>((set) => ({
    vehicles: [],
    vehicleDraft: null,
    isLoading: false,
    error: null,
    setVehicles: (vehicles) => set({ vehicles }),
    addVehicle: (vehicle) => set((state) => ({ vehicles: [...state.vehicles, vehicle] })),
    updateVehicle: (vehicle) =>
        set((state) => ({
            vehicles: state.vehicles.map((v) => (v.id === vehicle.id ? vehicle : v)),
        })),
    removeVehicle: (vehicleId) =>
        set((state) => ({
            vehicles: state.vehicles.filter((v) => v.id !== vehicleId),
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setVehicleDraft: (draft) => set({ vehicleDraft: draft }),
    clearVehicleDraft: () => set({ vehicleDraft: null }),
}));