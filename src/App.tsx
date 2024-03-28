import './assets/App.scss';
import { Flip, ToastContainer, toast } from 'react-toastify';
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
                if (type === 'success') {
                    toast.success(message);
                } else if (type === 'error') {
                    toast.error(message);
                } else if (type === 'warning') {
                    toast.warning(message);
                }
            } catch (error) {
              toast.error(standardErrorMessage);
        }});
    

    }, [connection]);


    useEffect(() => {
        refreshUser();
    }, [location]);

    
    return (
        <div className="container">
            <ToastContainer 
            autoClose={1500}
            transition={Flip}
            />
            <RoutesComponent />
        </div>
    );
}

export default App;