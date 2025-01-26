import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getToken } from "../helpers/TokenHelper";

interface SignalRContextType {
  connection: signalR.HubConnection | undefined;
  establishConnection: () => void;
  isConnectionValid: () => boolean;
  disconnect: () => void;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined
);

export const useSignalR = () =>
  useContext(SignalRContext) as SignalRContextType;

export const useAuth = () => useContext(SignalRContext) as SignalRContextType;

interface Props {
  children: React.ReactNode;
}

export const SignalRProvider = (props: Props) => {
  const [connection, setConnection] = useState<signalR.HubConnection>();

  useEffect(() => {
    if (connection) {
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
  }, [connection]);

  //@todo env of vite
  const establishConnection = () => {
    const con = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BACKEND_URL}/hub`, {
        accessTokenFactory: () => getToken() || "",
      })
      .withAutomaticReconnect()
      .build();

    setConnection(con);
  };

  const disconnect = async () => {
    connection?.stop();
  };

  const isConnectionValid = () => {
    return connection?.state === signalR.HubConnectionState.Connected;
  };

  const authContextValue: SignalRContextType = useMemo(
    () => ({
      connection,
      establishConnection,
      isConnectionValid,
      disconnect,
    }),
    [connection]
  );

  return (
    <SignalRContext.Provider value={authContextValue}>
      {props.children}
    </SignalRContext.Provider>
  );
};
