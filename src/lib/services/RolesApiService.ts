import axios from "axios";

const baseURL = "/api/Roles";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AxiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
});


export const getRoles = async () => {
    const response = await AxiosInstance.get(`All`);
    return response;
}

export const putRolesEdit = async (userId: string, role: string) => {
    const response = await AxiosInstance.put(`Edit`, {
        userId: userId,
        role: role 
    });

    return response;
}