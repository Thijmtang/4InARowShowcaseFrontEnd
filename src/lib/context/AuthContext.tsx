// AuthContext.js
import React, { createContext, useState, useContext, useMemo } from "react";
import { login as loginAPI, verifyJwtToken } from "../services/AuthApiService";
import { UserInfo } from "../interfaces/UserInfo";
import ArgumentError from "../errors/ArgumentError";
import { clearToken, getToken, setToken } from "../helpers/TokenHelper";
import { jwtDecode } from "jwt-decode";

// const navigate = useNavigate();
// @todo add roles??
interface AuthContextType {
  user: UserInfo | null;
  userHasRole: (user: UserInfo, roleName: string) => boolean;
  loggedIn: boolean;
  login: (email: string, password: string, twoFactorAuthcode: string) => void;
  logout: () => void;
  refreshUser: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (
    email: string,
    password: string,
    twoFactorAuthcode: string = ""
  ) => {
    // Perform login logic here (e.g., make API call)
    const response = await loginAPI(email, password, twoFactorAuthcode);

    //JWT token
    const data = await response.data;
    setToken(data);

    // User succesfully logged in
    if (response.status === 200) {
      try {
        setUserBasedOnJwt(data);
        setLoggedIn(true);
      } catch (error) {
        setUser(null);
      }

      return;
    }

    // Requires 2FA authentication
    if (response.status == 401 && data.detail === "RequiresTwoFactor") {
      setUser(null);
      throw new ArgumentError("2FA code is niet valide");
    }
  };

  const logout = async () => {
    clearToken();
    setUser(null);
    setLoggedIn(false);
  };

  // Set user data based on stored JWT token
  const refreshUser = async () => {
    // Add verify endpoint
    try {
      const refreshToken = await verifyJwtToken();

      // Session was not valid
      const validToken = refreshToken.status === 200;

      // Non valid token
      if (!validToken) {
        await logout();
        return;
      }

      setToken(refreshToken.data);

      setUserBasedOnJwt(refreshToken.data);

      setLoggedIn(true);
    } catch (error) {
      setUser(null);
    }
  };

  const userHasRole = (user: UserInfo, roleName: string) => {
    if (user?.role.length === 0) {
      return false;
    }

    return user.role.find((role) => role === roleName) != null;
  };

  const setUserBasedOnJwt = (jwtJSON: unknown) => {
    const userData = jwtDecode<UserInfo>(
      typeof jwtJSON === "string" ? jwtJSON : getToken() || ""
    );
    userData.role = [];

    if (typeof userData.role === "string") {
      userData.role = [userData.role];
    }

    console.log(userData);

    setUser(userData);
  };

  const authContextValue: AuthContextType = useMemo(
    () => ({
      user,
      userHasRole,
      login,
      loggedIn,
      logout,
      refreshUser,
    }),
    [user, loggedIn]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
