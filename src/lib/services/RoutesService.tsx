import { Route } from "react-router-dom";
import { UserInfo } from "../interfaces/UserInfo";
import { Lobby } from "../../pages/Lobby";
import { EnableTwoFactor } from "../../pages/TwoFactorAuthentication/EnableTwoFactor";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";

export const getRoutes = (user: UserInfo) => {
  const routeContent = [];

    // User is logged in
    if(user) {
        if(!user.twoFactorEnabled) {

          
        routeContent.push(
          <>
                <Route path="" element={<Lobby/>} />
          </>);

        return routeContent;
        }

      
        routeContent.push(
          <>
                <Route path="" element={<Lobby/>} />
          </>);
        return routeContent;
    }

    
    routeContent.push(
      <>
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
      
      </>
    );

  return routeContent;
}