import "./assets/App.scss";
import { Flip, ToastContainer, toast } from "react-toastify";
import { RoutesComponent } from "./components/RoutesComponent";
import { useEffect } from "react";
import { useAuth } from "./lib/context/AuthContext";
import { useSignalR } from "./lib/context/SignalRContext";
import { standardErrorMessage } from "./lib/services/ToastService";
import axiosConfig from "./lib/helpers/AxiosInstance";

function App() {
  const { refreshUser, logout } = useAuth();
  const { connection } = useSignalR();

  useEffect(() => {
    // On SignalR websocket connection, global events
    connection?.on("FlashAlert", (message: string, type: string) => {
      try {
        if (type === "success") {
          toast.success(message);
        } else if (type === "error") {
          toast.error(message);
        } else if (type === "warning") {
          toast.warning(message);
        }
      } catch (error) {
        toast.error(standardErrorMessage);
      }
    });
  }, [connection]);

  useEffect(() => {
    axiosConfig().interceptors.response.use(
      (response) => {
        // Proceed normally for successful responses
        return response;
      },
      async (error) => {
        if (error.response.status == 401) {
          console.log("Unauthorized! Logging out...");
          logout();
        }

        // Reject the error to propagate it to the .catch() block
        return Promise.reject(error);
      }
    );
    connection?.onclose((error) => {
      console.log(error);
      if (
        error &&
        (error.message.toLowerCase().includes("unauthorized") ||
          error.message.toLowerCase().includes("401"))
      ) {
        logout();
      }
    });
  });

  useEffect(() => {
    refreshUser();
  }, [location]);

  return (
    <div className="container">
      <ToastContainer autoClose={1500} transition={Flip} />
      <RoutesComponent />
    </div>
  );
}

export default App;
