import axios from "axios";
import Constants from "expo-constants";
import { getAuth, getIdToken } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";

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
        try {
            const app = getApp();
            const auth = getAuth(app);
            const user = auth.currentUser;
            
            if (user) {
                const token = await getIdToken(user);
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.log("Error getting auth token:", error);
            // Continue with request even if token fetch fails
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to log errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("❌ API Error:", error.response?.status, error.response?.data, "for URL:", error.config?.url);
        return Promise.reject(error);
    }
);

export default axiosInstance;