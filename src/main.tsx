import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/ReactToastify.css'
import { AuthProvider } from './lib/context/AuthContext.tsx';
import { SignalRProvider } from './lib/context/SignalRContext.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
        <SignalRProvider>
          <App />
        </SignalRProvider>
        </AuthProvider>
  </React.StrictMode>,
)
