import React, { useEffect } from "react";
import Toast from "../src/components/Toast";
import Loading from "../src/components/Loading";
import { AlertColor } from "@mui/material/Alert";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
  showToast: (message: React.ReactNode, severity?: AlertColor | undefined) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextProps>({
  auth: null,
  setAuth: () => {},
  showToast: () => {},
  setLoading: () => {}
});

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [auth, setAuth] = React.useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isToast, setToast] = React.useState<boolean>(false);
  const [severity, setSeverity] = React.useState<AlertColor | undefined>("error");
  const [message, setMessage] = React.useState<React.ReactNode>("");

  const showToast = (message: React.ReactNode, severity: AlertColor | undefined = "error") => {
    setToast(true);
    setMessage(message);
    setSeverity(severity);
  };

  const value: AppContextProps = {
    auth,
    setAuth,
    showToast,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      <Loading open={isLoading} />
      <Toast
        open={isToast}
        message={message}
        severity={severity}
        onClose={() => {
          setToast(false)
        }}
      />
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextProps => {
  return React.useContext(AppContext);
};

export default AppProvider;
