import axios from "axios";

const baseURL = "https://localhost:7161/Roles";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AxiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
});


export const getRoles = async () => {
    const response = await AxiosInstance.get(`All`);
    return response;
}