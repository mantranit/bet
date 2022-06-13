import React, { useEffect } from "react";
import Toast from "../src/components/Toast";
import Loading from "../src/components/Loading";
import { AlertColor } from "@mui/material/Alert";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  Auth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { parseCookies, setCookie, destroyCookie } from "nookies";

interface AppUser extends User {
  accessToken: string;
}

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  user: User | null;
  showToast: (
    message: React.ReactNode,
    severity?: AlertColor | undefined
  ) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginByEmail: (email: string, password: string) => void;
  signInByEmail: (email: string, password: string) => void;
  logout: () => void;
}

const AppContext = React.createContext<AppContextProps>({
  user: null,
  showToast: () => {},
  setLoading: () => {},
  loginByEmail: () => {},
  signInByEmail: () => {},
  logout: () => {},
});

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [auth, setAuth] = React.useState<Auth | null>(null);
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
    setAuth(getAuth(app));
  }, []);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { accessToken = '' } = user as AppUser;
          setCookie(null, "_access_token", accessToken, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
          });
          setUser(user);
        } else {
          destroyCookie(null, "_access_token");
          setUser(null);
        }
      });
    }
  }, [auth]);

  const showToast = (
    message: React.ReactNode,
    severity: AlertColor | undefined = "error"
  ) => {
    setToast(true);
    setMessage(message);
    setSeverity(severity);
  };

  const loginByEmail = (email: string, password: string) => {
    setLoading(true);
    signInWithEmailAndPassword(auth!, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setUser(user);
      })
      .catch((error) => {
        showToast(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInByEmail = (email: string, password: string) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth!, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setUser(user);
      })
      .catch((error) => {
        showToast(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);
    signOut(auth!)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        showToast(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value: AppContextProps = {
    user,
    showToast,
    setLoading,
    loginByEmail,
    signInByEmail,
    logout,
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
