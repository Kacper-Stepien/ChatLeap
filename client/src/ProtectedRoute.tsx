import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

type ProtectedRouteProps = {
  element: JSX.Element;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? element : <Navigate to="/login" />;
};
