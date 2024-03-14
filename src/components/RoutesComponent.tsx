import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GameBoard4InARow from '../pages/GameBoard4InARow'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Register/Register'
import Header from './Header'
import { useAuth } from '../lib/context/AuthContext'
import { Lobby } from '../pages/Lobby'

export const RoutesComponent = () => {
  const { user} = useAuth();

  
  return (
    <BrowserRouter>
    <Header />
          <Routes>
              <Route path="" element={<Lobby/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/Register" element={<Register/>} />
              <Route path="*" element={<GameBoard4InARow />}/>
          </Routes>
      </BrowserRouter>  )
}
