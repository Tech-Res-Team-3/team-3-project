import axios from "../../utils/axios";
import { useAuthStore } from "../../stores/authStore";

export const usePromoteToHost = () => {
    const setUser = useAuthStore((state) => state.setUser);

    const promoteToHost = async () => {
        const res = await axios.patch("/users/promote-to-host");
        if (res.data.user) setUser(res.data.user);
        return res.data.user;
    };

    return { promoteToHost };
};