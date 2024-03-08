import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*   <App /> */}
    <div className="container">
      <Header />
      <App />

    </div>
  </React.StrictMode>,
)
