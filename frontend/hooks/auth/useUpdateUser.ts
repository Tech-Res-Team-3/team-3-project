import axios from "../../utils/axios";
import { useAuthStore } from "../../stores/authStore";

export const useUpdateUser = () => {
    const setUser = useAuthStore((state) => state.setUser);

    const updateUser = async ( data: any) => {
        const res = await axios.patch(`/users/`, data);
        if (res.data.data) setUser(res.data.data);
        return res.data;
    };

    return { updateUser };
};