import { Route } from "react-router-dom";
import { UserInfo } from "../interfaces/UserInfo";
import { LobbyJoin } from "../../pages/Lobby/LobbyJoin";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import { EnableTwoFactor } from "../../pages/TwoFactorAuthentication/EnableTwoFactor";
import { TwoFactorLogin } from "../../pages/TwoFactorAuthentication/TwoFactorLogin";

export const getRoutes = (user: UserInfo) => {
  let routeContent = <></>;

    // User is logged in
    if(user) {
        if(!user.twoFactorEnabled) {
          routeContent = <>
                  <Route path="" element={<EnableTwoFactor/>} />
          </>;

          return routeContent;
        }

      
        // Login 2FA routes only
        routeContent = 
          <>
                <Route path="" element={<LobbyJoin/>} />
          </>;
        return routeContent;
    }

    
    routeContent= 
      <>
        <Route path="/Login" element={<Login/>} />
        <Route path="/2fa/verify" element={<TwoFactorLogin/>} />
        <Route path="/Register" element={<Register/>} />
      
      </>;

  return routeContent;
}