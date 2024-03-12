import axios from "axios";
import { AxiosInstance } from "../utils/AxiosInstance";

const baseURL = "https://localhost:7161";
// private client:AxiosInstance;
// const client;
/**
 *
 */
// constructor() {
    // this.client = axios.create({
        // baseURL: this.baseURL
    // });
// }
axios.defaults.withCredentials = true;

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/login?useCookies=true`, {
        email: email,
        password: password,
    });

    return response;
}

export const refreshSession = async (refreshToken: string) => {
    const response = await axios.post(`${baseURL}/refresh`, {
        refreshToken: refreshToken,
    });

    return response;
}

export const register = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/login`, {
        email: email,
        password: password,
    });

    return response;
}