import axios from "axios";

const baseURL = "https://fakestoreapi.com";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, 
});

export default axiosInstance;
