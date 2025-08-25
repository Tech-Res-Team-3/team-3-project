import axios from "../../utils/axios";
import { useAuthStore } from "../../stores/authStore";

export const useUserSync = () => {
    const setUser = useAuthStore((state) => state.setUser);

    const syncUser = async () => {
        const res = await axios.post("/users/sync", {});
        if (res.data.user) setUser(res.data.user);
        return res.data.user;
    };

    return { syncUser };
};