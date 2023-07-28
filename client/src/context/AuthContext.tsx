import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import LocalStorage from "../utils/LocalStorage";

interface User {
  id: string;
  userName: string;
  userSurname: string;
  userNick: string;
  photo: string;
}

interface AuthContextProps {
  user: User | null;
  loggedIn: boolean;
  token: string | null;
  setLoggedInUser: (user: User, token: string) => void;
  setLoggedOutUser: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const initialState: AuthContextProps = {
  user: null,
  loggedIn: false,
  token: null,
  setLoggedInUser: (user: User, token: string) => {},
  setLoggedOutUser: () => {},
};

const AuthContext = createContext<AuthContextProps>(initialState);

const AuthProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const localStorage = new LocalStorage();

  const setLoggedInUser = (user: User, token: string) => {
    if (user && token) {
      setUser(user);
      setToken(token);
      setLoggedIn(true);
      localStorage.writeToken(token);
      localStorage.writeUser(user);
    } else {
      throw new Error("No user and token provided");
    }
  };

  const setLoggedOutUser = () => {
    setUser(null);
    setToken(null);
    setLoggedIn(false);
    localStorage.clearToken();
    localStorage.clearUser();
  };

  const initializeApp = () => {
    const user = localStorage.readUser();
    const token = localStorage.readToken();

    if (user && token) {
      setLoggedInUser(user, token);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        token,
        setLoggedInUser,
        setLoggedOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
