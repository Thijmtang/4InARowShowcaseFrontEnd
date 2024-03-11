import axios from "axios";

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

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/login`, {
        email: email,
        password: password,
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