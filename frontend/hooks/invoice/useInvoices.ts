import { useInvoiceStore } from '../../stores/invoiceStore';
import { useCallback } from 'react';
import axios from '../../utils/axios';

export function useInvoices() {
    const {
        invoices,
        setInvoices,
        addInvoice,
        updateInvoice,
        removeInvoice,
        setLoading,
        setError,
    } = useInvoiceStore();

    // Fetch all invoices (admin)
    const fetchAllInvoices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get('/invoices');
            // setInvoices(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch invoices');
        } finally {
            setLoading(false);
        }
    }, [setInvoices, setLoading, setError]);

    // Fetch invoices for current user
    const fetchUserInvoices = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            // const res = await axios.get(`/users/${userId}/invoices`);
            // setInvoices(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch user invoices');
        } finally {
            setLoading(false);
        }
    }, [setInvoices, setLoading, setError]);

    return {
        invoices,
        fetchAllInvoices,
        fetchUserInvoices,
        addInvoice,
        updateInvoice,
        removeInvoice,
    };
}