import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import LocalStorage from "./utils/LocalStorage";

type ProtectedRouteProps = {
  element: JSX.Element;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { loggedIn, setLoggedIn, setToken } = useContext(AuthContext);
  if (loggedIn) {
    return element;
  }

  const localStorage = new LocalStorage();
  const token = localStorage.readToken();
  const user = localStorage.readUser();
  if (token && user) {
    setLoggedIn(true);
    setToken(token);
    return element;
  }
  return <Navigate to="/login" />;
};
