import './assets/App.scss';
import { ToastContainer, toast } from 'react-toastify';
import { RoutesComponent } from './components/RoutesComponent';
import { useEffect } from 'react';
import { useAuth } from './lib/context/AuthContext';
import { useSignalR } from './lib/context/SignalRContext';
import { standardErrorMessage } from './lib/services/ToastService';

function App() {
    const {refreshUser} = useAuth();
    const {connection} = useSignalR();

    useEffect(() => {
        // On SignalR websocket connection, global events
        connection?.on("FlashAlert", (message:string, type:string) => {
            try {
                console.log(message);
              toast[type](message);
            } catch (error) {
              toast.error(standardErrorMessage);
        }});
    
    }, [connection])


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