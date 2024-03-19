import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from '../pages/Login'
import Header from './Header'
import { useAuth } from '../lib/context/AuthContext'
import { Lobby } from '../pages/Lobby'
import { EnableTwoFactor } from '../pages/TwoFactorAuthentication/EnableTwoFactor'
import { getRoutes } from '../lib/services/RoutesService'
import GameBoard4InARow from '../pages/GameBoard4InARow'

export const RoutesComponent = () => {
  const { user} = useAuth();


  const routeContent = getRoutes(user);

  let fallBackRoute = <Lobby />;

  //@otdo fix dit 
  if(!user) {
    fallBackRoute = <Login />
}

  if(user && !user.twoFactorEnabled) {
    fallBackRoute = <EnableTwoFactor />
  }

  console.log(routeContent);
  

  return (
    <BrowserRouter>
    <Header />
          <Routes>
            {routeContent}
            <Route path="*" element={fallBackRoute}/>
          </Routes>
      </BrowserRouter>  )
}
