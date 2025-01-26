import axios from "axios";
import axiosConfig from "../helpers/AxiosInstance";

axios.defaults.withCredentials = true;

export const login = async (
  email: string,
  password: string,
  twoFactorAuthcode: string
) => {
  const response = await axiosConfig().post(`api/auth/login`, {
    email: email,
    password: password,
    twoFactorCode: twoFactorAuthcode,
  });

  return response;
};

export const signOut = async () => {
  const response = axiosConfig().post(`api/auth/signOut`);

  return response;
};

export const register = async (email: string, password: string) => {
  const response = await axiosConfig().post(`register`, {
    email: email,
    password: password,
  });

  return response;
};

export const getTwoFactorSecretKey = async () => {
  const response = await axiosConfig().get(`TwoFactor/secret`, {});
  return response;
};

export const enableTwoFactorAuthentication = async (
  verificationCode: string
) => {
  const response = await axiosConfig().post(`TwoFactor/enable`, {
    Code: verificationCode,
  });

  return response;
};
// deprecated
export const getUserInfo = async () => {
  const response = await axiosConfig().get(`api/auth/UserInfo`);
  return response;
};

export const verifyJwtToken = async () => {
  const response = await axiosConfig().get(`api/auth/token/verify`);
  return response;
};
