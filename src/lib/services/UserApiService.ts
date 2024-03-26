import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/User`;

const AxiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
});


export const getUsers = async () => {
    const response = await AxiosInstance.get(`All`);
    return response;
}