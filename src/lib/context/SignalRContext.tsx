import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface SignalRContextType {
    connection: signalR.HubConnection | undefined;
    establishConnection: () => void; 
    isConnectionValid: () => boolean
}


export const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export const useSignalR = () => useContext(SignalRContext) as SignalRContextType;

export const useAuth = () => useContext(SignalRContext) as SignalRContextType;


interface Props {
    children: React.ReactNode
}

export const SignalRProvider = (props: Props) => {
    const [connection, setConnection] = useState<signalR.HubConnection>();


    useEffect(() => {
        if(connection) {
            try {
                connection.start();
            } catch (error) {
                // Connectie brookey
                throw Error();
            }
        }

        return () => {
            connection?.stop();
        };
    },[connection]);
    
    //@todo env of vite 
    const establishConnection = () => {
        const con = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7161/hub")
        .build();
    
        setConnection(con);
    };  

    const isConnectionValid = () => {
        return connection?.state === signalR.HubConnectionState.Connected
    }


    const authContextValue: SignalRContextType = {
        connection,
        establishConnection,
        isConnectionValid
    };

    return <SignalRContext.Provider value={authContextValue}>{props.children}</SignalRContext.Provider>;

};