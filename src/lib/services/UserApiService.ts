import axios from "axios";

const baseURL = "https://localhost:7161/User";

const AxiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
});


export const getUsers = async () => {
    const response = await AxiosInstance.get(`All`);
    return response;
}