import axios from "axios";

// @todo env variable
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

const AxiosInstance = axios.create({
        baseURL,
        withCredentials: true,
});

axios.defaults.withCredentials = true;

export const login = async (email: string, password: string, twoFactorAuthcode: string) => {
    const response = await AxiosInstance.post(`${baseURL}/login?useCookies=true`, {
        email: email,
        password: password,
        twoFactorCode: twoFactorAuthcode
    });

    return response;
}

export const signOut = async () => {
    const response = AxiosInstance.post(`${baseURL}/signOut`    );
    
    return response;
}

//@deprecated
// export const refreshSession = async (refreshToken: string) => {
//     const response = await axios.post(`${baseURL}/refresh`, {
//         refreshToken: refreshToken,
//     });

//     return response;
// }

export const register = async (email: string, password: string) => {
    const response = await AxiosInstance.post(`${baseURL}/register`, {
        email: email,
        password: password,
    });

    return response;
}


export const getTwoFactorSecretKey = async () => {
    const response = await AxiosInstance.get(`${baseURL}/TwoFactor/secret`, {});
    return response;
}

export const enableTwoFactorAuthentication = async (verificationCode: string) => {
    const response = await AxiosInstance.post(`${baseURL}/TwoFactor/enable`, {Code: verificationCode});
    
    return response;
}

export const getUserInfo = async () => {
    const response = await AxiosInstance.get(`${baseURL}/UserInfo`);
    return response;
};
