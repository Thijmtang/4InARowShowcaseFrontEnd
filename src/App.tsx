import './assets/App.scss';
import { ToastContainer } from 'react-toastify';
import { RoutesComponent } from './components/RoutesComponent';
import axios from 'axios';

function App() {
    axios.defaults.withCredentials = true;
    return (
            <div className="container">
            <ToastContainer />
            <RoutesComponent />
            </div>
    );


}

export default App;