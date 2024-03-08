import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*   <App /> */}
    <div className="container">
      <Header />
      <BrowserRouter>
              <Routes>
                  <Route path="" element={<App/>} />
              </Routes>
          </BrowserRouter>

    </div>
  </React.StrictMode>,
)
