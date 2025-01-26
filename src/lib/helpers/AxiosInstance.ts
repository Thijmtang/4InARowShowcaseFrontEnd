import axios from "axios";
import { getToken } from "./TokenHelper";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + getToken();

const axiosConfig = () => {
  return axiosInstance;
};

export default axiosConfig;
