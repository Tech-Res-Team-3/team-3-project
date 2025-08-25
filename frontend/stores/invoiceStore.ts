import { create } from 'zustand';
import { Invoice } from '../types/invoice';

interface InvoiceStoreState {
    invoices: Invoice[];
    isLoading: boolean;
    error: string | null;
    setInvoices: (invoices: Invoice[]) => void;
    addInvoice: (invoice: Invoice) => void;
    updateInvoice: (invoice: Invoice) => void;
    removeInvoice: (invoiceId: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useInvoiceStore = create<InvoiceStoreState>((set) => ({
    invoices: [],
    isLoading: false,
    error: null,
    setInvoices: (invoices) => set({ invoices }),
    addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),
    updateInvoice: (invoice) =>
        set((state) => ({
            invoices: state.invoices.map((i) => (i.id === invoice.id ? invoice : i)),
        })),
    removeInvoice: (invoiceId) =>
        set((state) => ({
            invoices: state.invoices.filter((i) => i.id !== invoiceId),
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));