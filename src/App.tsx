import './assets/App.scss';
import { ToastContainer } from 'react-toastify';
import { RoutesComponent } from './components/RoutesComponent';
import { AuthProvider } from './lib/context/AuthContext';
function App() {

    return (
            <div className="container">
            <ToastContainer />
            <RoutesComponent />
            </div>
    );


}

export default App;