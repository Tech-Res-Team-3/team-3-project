import { create } from 'zustand';
import { Address } from '../types/address';

interface AddressStoreState {
    addresses: Address[];
    isLoading: boolean;
    error: string | null;
    setAddresses: (addresses: Address[]) => void;
    addAddress: (address: Address) => void;
    updateAddress: (address: Address) => void;
    removeAddress: (addressId: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAddressStore = create<AddressStoreState>((set) => ({
    addresses: [],
    isLoading: false,
    error: null,
    setAddresses: (addresses) => set({ addresses }),
    addAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })),
    updateAddress: (address) =>
        set((state) => ({
            addresses: state.addresses.map((a) => (a.id === address.id ? address : a)),
        })),
    removeAddress: (addressId) =>
        set((state) => ({
            addresses: state.addresses.filter((a) => a.id !== addressId),
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));