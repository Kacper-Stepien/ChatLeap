import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import LocalStorage from "./utils/LocalStorage";

type ProtectedRouteProps = {
  element: JSX.Element;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { loggedIn, setLoggedInUser } = useAuth();
  const [initialized, setInitialized] = useState(false);

  const checkIfUserIsAuthorized = () => {
    const localStorage = new LocalStorage();
    const token = localStorage.readToken();
    const user = localStorage.readUser();

    if (token && user) {
      setLoggedInUser(user, token);
    }

    setInitialized(true);
  };

  useEffect(() => {
    checkIfUserIsAuthorized();
  }, []);

  if (!initialized) {
    return null;
  }

  if (loggedIn) {
    return element;
  }

  return <Navigate to="/login" />;
};
