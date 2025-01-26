const tokenKey = "token";

export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenKey) ?? null;
};

export const clearToken = () => {
  localStorage.removeItem(tokenKey);
};
