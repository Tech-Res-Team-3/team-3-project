import axios from "axios";
import Constants from "expo-constants";
import auth from "@react-native-firebase/auth";

const API_URL =
    Constants.expoConfig?.extra?.API_URL ||
    process.env.API_URL ||
    "http://localhost:3333";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Add a request interceptor for auth tokens
axiosInstance.interceptors.request.use(
    async (config) => {
        const user = auth().currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;