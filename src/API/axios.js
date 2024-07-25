import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://amazon-backend-1n1n.onrender.com",
});

export default axiosInstance;
