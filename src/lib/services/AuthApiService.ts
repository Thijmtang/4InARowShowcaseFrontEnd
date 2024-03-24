import axios from "axios";

// @todo env variable
const baseURL = "https://localhost:7161";

const AxiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
});

axios.defaults.withCredentials = true;

export const login = async (email: string, password: string, twoFactorAuthcode: string) => {
    const response = await AxiosInstance.post(`login?useCookies=true`, {
        email: email,
        password: password,
        twoFactorCode: twoFactorAuthcode
    });

    return response;
}

export const signOut = async () => {
    const response = AxiosInstance.post(`signOut`    );
    
    return response;
}

export const register = async (email: string, password: string) => {
    const response = await AxiosInstance.post(`register`, {
        email: email,
        password: password,
    });

    return response;
}

export const getTwoFactorSecretKey = async () => {
    const response = await AxiosInstance.get(`TwoFactor/secret`, {});
    return response;
}

export const enableTwoFactorAuthentication = async (verificationCode: string) => {
    const response = await AxiosInstance.post(`TwoFactor/enable`, {Code: verificationCode});
    
    return response;
}

export const getUserInfo = async () => {
    const response = await AxiosInstance.get(`UserInfo`);
    return response;
};

