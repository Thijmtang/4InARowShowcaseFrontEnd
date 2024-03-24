// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import {login as loginAPI, signOut as signOutAPI, getUserInfo} from '../services/AuthApiService';
import { UserInfo } from '../interfaces/UserInfo';
import ArgumentError from '../errors/ArgumentError';

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
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const AuthProvider = ( props: Props) => {
  const [user, setUser] = useState<UserInfo|null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
    
  const login = async (email: string, password: string, twoFactorAuthcode: string = '') => {
    // Perform login logic here (e.g., make API call)
    const response = await loginAPI(email, password, twoFactorAuthcode);
    const data = await response.data;

    // User succesfully logged in 
    if(response.status === 200) {
      const userData = await getUserInfo();
      await setUser(userData.data);

      // sessionStorage.setItem("authTokens", JSON.stringify(data));

      setLoggedIn(true);
      return;
    }

    // Requires 2FA authentication
    if(response.status == 401 && data.detail === 'RequiresTwoFactor') {
      setUser(null);
      throw new ArgumentError("2FA code is niet valide");
    }
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

  const userHasRole = (user: UserInfo, roleName: string) => {
    return user.roles.find(role => role === roleName) != null;
  }

  const authContextValue: AuthContextType = {
    user,
    userHasRole,
    login,
    loggedIn,
    logout,
    refreshUser
  };


  // const value = useMemo(() => ({
  //   user,
  //   login,
  //   loggedIn,
  //   logout,
  //   refreshUser
  //   }), [user]);

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
};
