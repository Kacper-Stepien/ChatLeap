import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import LocalStorage from "./utils/LocalStorage";

type ProtectedRouteProps = {
  element: JSX.Element;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { loggedIn, setLoggedIn, setToken } = useContext(AuthContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const localStorage = new LocalStorage();
    const token = localStorage.readToken();
    const user = localStorage.readUser();

    if (token && user) {
      setLoggedIn(true);
      setToken(token);
    }

    setInitialized(true);
  }, [setLoggedIn, setToken]);

  if (!initialized) {
    return null;
  }

  if (loggedIn) {
    return element;
  }

  return <Navigate to="/login" />;
};
