import { create } from 'zustand'; interface User {
    id: string; email: string; name: string;
}
interface AuthState {
    user: User | null; isLoading: boolean; login: (email: string, password: string) => Promise<void>; logout: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
    user: null, isLoading: false, login: async (email: string, password: string) => {
        set({ isLoading: true }); try {
            // API call logic here      const user = await authenticateUser(email, password);      set({ user, isLoading: false });    } catch (error) {
            set({ isLoading: false }); throw new Error('Error occurred');
        } catch {
            /* error logic */
        }
    }, logout: () => {
        set({ user: null });
    },
}));