import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://habitizr.com/";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to include token from AsyncStorage
api.interceptors.request.use(
    async (config) => {
        try {
            const userData = await AsyncStorage.getItem("user");
            const user = userData ? JSON.parse(userData) : null;
            const token = user?.phoneVerificationToken;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error fetching auth token:", error);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;