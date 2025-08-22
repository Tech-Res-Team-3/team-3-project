import axios from "../utils/axios";

export const useDeleteUser = () => {
    const deleteUser = async (id: number) => {
        const res = await axios.delete(`/users/${id}`);
        return res.data;
    };

    return { deleteUser };
};