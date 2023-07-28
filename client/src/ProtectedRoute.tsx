import { useEffect, useState } from "react";

import { FC } from "react";
import LocalStorage from "./utils/LocalStorage";
import { Navigate } from "react-router-dom";
import { log } from "console";
import { useAuth } from "./context/AuthContext";

type ProtectedRouteProps = {
  element: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
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

export default ProtectedRoute;
