import axiosConfig from "../helpers/AxiosInstance";

export const getUsers = async () => {
  const response = await axiosConfig().get(`/user/all`);
  return response;
};
