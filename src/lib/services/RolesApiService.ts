import axiosConfig from "../helpers/AxiosInstance";

export const getRoles = async () => {
  const response = await axiosConfig().get(`Roles/All`);
  return response;
};

export const putRolesEdit = async (userId: string, role: string) => {
  const response = await axiosConfig().put(`Roles/Edit`, {
    userId: userId,
    role: role,
  });

  return response;
};
