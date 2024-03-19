import './assets/App.scss';
import { ToastContainer } from 'react-toastify';
import { RoutesComponent } from './components/RoutesComponent';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './lib/context/AuthContext';

function App() {
    const {refreshUser} = useAuth();


    useEffect(() => {
        refreshUser();
    }, [location]);

    
    return (
            <div className="container">
            <ToastContainer />
            <RoutesComponent />
            </div>
    );
}

export default App;