import React, { useEffect } from "react";
import Toast from "../src/components/Toast";
import Loading from "../src/components/Loading";
import { AlertColor } from "@mui/material/Alert";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
  showToast: (
    message: React.ReactNode,
    severity?: AlertColor | undefined
  ) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginByEmail: (email: string, password: string) => void;
  signInByEmail: (email: string, password: string) => void;
}

const AppContext = React.createContext<AppContextProps>({
  auth: null,
  setAuth: () => {},
  showToast: () => {},
  setLoading: () => {},
  loginByEmail: () => {},
  signInByEmail: () => {},
});

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [auth, setAuth] = React.useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isToast, setToast] = React.useState<boolean>(false);
  const [severity, setSeverity] = React.useState<AlertColor | undefined>(
    "error"
  );
  const [message, setMessage] = React.useState<React.ReactNode>("");

  useEffect(() => {
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
      apiKey: "AIzaSyA5Cu-9-DdJXFjuo8_1D4UoUXHfI9mzxq4",
      authDomain: "worldcup2022-d24da.firebaseapp.com",
      databaseURL:
        "https://worldcup2022-d24da-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "worldcup2022-d24da",
      storageBucket: "worldcup2022-d24da.appspot.com",
      messagingSenderId: "265462252701",
      appId: "1:265462252701:web:9273d1c822050c7637c074",
      measurementId: "G-CSGGFWEJ2E",
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  }, []);

  const showToast = (
    message: React.ReactNode,
    severity: AlertColor | undefined = "error"
  ) => {
    setToast(true);
    setMessage(message);
    setSeverity(severity);
  };

  const loginByEmail = (
    email: string,
    password: string,
    callback?: (err: Error) => void
  ) => {
    setLoading(true);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.info(user);
        // ...
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        setLoading(false);
      });
  };

  const signInByEmail = (
    email: string,
    password: string,
    callback?: (err: Error) => void
  ) => {
    setLoading(true);
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.info(user);
        // ...
        setLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.error(error);
        setLoading(false);
      });
  };

  const value: AppContextProps = {
    auth,
    setAuth,
    showToast,
    setLoading,
    loginByEmail,
    signInByEmail,
  };

  return (
    <AppContext.Provider value={value}>
      <Loading open={isLoading} />
      <Toast
        open={isToast}
        message={message}
        severity={severity}
        onClose={() => {
          setToast(false);
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
