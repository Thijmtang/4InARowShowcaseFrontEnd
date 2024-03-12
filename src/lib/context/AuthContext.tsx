// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import {login as loginAPI} from '../../lib/services/AuthService';

// @todo add roles??
interface User {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
}
  
interface AuthContextType {
    user: User | null;
    loggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface Props {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ( props: Props) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    // Perform login logic here (e.g., make API call)
    const response = await loginAPI(email, password);
    const data = await response.data;

    if(response.status === 200) {
      setUser(data);

      sessionStorage.setItem("authTokens", JSON.stringify(data));

      setLoggedIn(true);
    }
  };

  const logout = () => {
    // Perform logout logic here (e.g., clear local storage, make API call)

    sessionStorage.removeItem("authTokens");


    setUser(null);
    setLoggedIn(false);
  };


  const authContextValue: AuthContextType = {
    user,
    login,
    loggedIn,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
};
