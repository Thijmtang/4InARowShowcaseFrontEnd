// AuthContext.js
import React, { createContext, useState, useContext, useMemo } from 'react';
import {login as loginAPI, signOut as signOutAPI, getUserInfo} from '../../lib/services/AuthService';
import { UserInfo } from '../interfaces/UserInfo';

// const navigate = useNavigate();
// @todo add roles??



interface AuthContextType {
    user: UserInfo | null;
    loggedIn: boolean;
    login: (email: string, password: string, twoFactorAuthcode: string) => void;
    logout: () => void;
    refreshUser: () => void;
}


interface Props {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ( props: Props) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
    
  const login = async (email: string, password: string, twoFactorAuthcode: string) => {
    // Perform login logic here (e.g., make API call)
    const response = await loginAPI(email, password, twoFactorAuthcode);
    const data = await response.data;

    if(response.status === 200) {
      const userData = await getUserInfo();
      await setUser(userData.data);

      // sessionStorage.setItem("authTokens", JSON.stringify(data));

      setLoggedIn(true);
      return;
    }

    setUser(null);
    throw new Error("2FA code is niet valide");
  };

  const logout = async () => {
    // Perform logout logic here (e.g., clear local storage, make API call)

    await signOutAPI();
      

    setUser(null);
    setLoggedIn(false);
  };

  const refreshUser = async () => {
    try {
      const userData = await getUserInfo();
      await setUser(userData.data);

    } catch (error) {
      setUser(null);
    }
  }


  // const authContextValue: AuthContextType = {
    // user,
    // login,
    // loggedIn,
    // logout,
  // };


  const value = useMemo(() => ({
    user,
    login,
    loggedIn,
    logout,
    refreshUser
    }), [user]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
