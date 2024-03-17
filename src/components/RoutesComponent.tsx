import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import GameBoard4InARow from '../pages/GameBoard4InARow'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import Header from './Header'
import { useAuth } from '../lib/context/AuthContext'
import { Lobby } from '../pages/Lobby'
import { EnableTwoFactor } from '../pages/TwoFactorAuthentication/EnableTwoFactor'
import { getRoutes } from '../lib/services/RoutesService'

export const RoutesComponent = () => {
  const { user} = useAuth();


  const routeContent = getRoutes(user);

  let fallBackRoute = <GameBoard4InARow />;

  if(user && !user.twoFactorEnabled) {
    fallBackRoute = <EnableTwoFactor />
  }
  

  return (
    <BrowserRouter>
    <Header />
          <Routes>
            {routeContent}
            <Route path="*" element={fallBackRoute}/>
          </Routes>
      </BrowserRouter>  )
}
