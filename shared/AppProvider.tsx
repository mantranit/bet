import React, { useEffect } from "react";
import Toast from "../src/components/Toast";
import Loading from "../src/components/Loading";
import { AlertColor } from "@mui/material/Alert";
import { FirebaseApp } from "firebase/app";
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
import { initFirebase } from "./firebase";
import { useRouter } from "next/router";

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
  const router = useRouter();

  useEffect(() => {
    const app: FirebaseApp = initFirebase();
    setAuth(getAuth(app));
  }, []);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { accessToken = "" } = user as AppUser;
          setCookie(null, "_access_token", accessToken, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
          });
          setUser(user);
          router.push(`/`);
        } else {
          destroyCookie(null, "_access_token");
          setUser(null);
          router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
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
