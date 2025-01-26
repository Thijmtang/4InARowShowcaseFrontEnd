import { Route } from "react-router-dom";
import { UserInfo } from "../interfaces/UserInfo";
import { LobbyJoin } from "../../pages/Lobby/LobbyJoin";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import { EnableTwoFactor } from "../../pages/TwoFactorAuthentication/EnableTwoFactor";
import { TwoFactorLogin } from "../../pages/TwoFactorAuthentication/TwoFactorLogin";
import { Lobby } from "../../pages/Lobby/Lobby";
import GameBoard4InARow from "../../pages/GameBoard4InARow";
import { UserRoles } from "../../pages/Admin/UserRoles";
import { useAuth } from "../context/AuthContext";

export const getRoutes = (user: UserInfo | null) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userHasRole } = useAuth();

  let routeContent = <></>;

  // User is logged in
  if (user) {
    console.log(user.two_fa_enabled);
    console.log(user.two_fa_enabled === false);
    // Logged in users are forced to enable 2fa
    if (!user.two_fa_enabled) {
      routeContent = <Route path="" element={<EnableTwoFactor />} />;

      return routeContent;
    }

    let adminRoutes = <></>;
    if (userHasRole(user, "Admin")) {
      adminRoutes = <Route path="/admin" element={<UserRoles />} />;
    }

    // Login 2FA routes only
    routeContent = (
      <>
        <Route path="" element={<LobbyJoin />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<GameBoard4InARow />} />
        {adminRoutes}
      </>
    );

    return routeContent;
  }

  routeContent = (
    <>
      <Route path="/Login" element={<Login />} />
      <Route path="/2fa/verify" element={<TwoFactorLogin />} />
      <Route path="/Register" element={<Register />} />
    </>
  );

  return routeContent;
};
