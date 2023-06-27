import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";
import { LoadingSpinnerContext } from "./context/LoadinSpinnerContext";

import LoadingSPpinner from "./components/LoadingSpinner";
import LocalStorage from "./utils/LocalStorage";

import RootLayout from "./pages/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import User from "./pages/User";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <ProtectedRoute element={<Main />} />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "user/:id",
        element: <ProtectedRoute element={<User />} />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  const [mode, setMode] = useState("dark");
  const [accent, setAccent] = useState("Indigo");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    userID: "",
    userName: "",
    userSurname: "",
    userNick: "",
  });
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initializeApp = () => {
    const localStorage = new LocalStorage();
    const mode: string = localStorage.readMode();
    const accent: string = localStorage.readAccent();
    if (mode) setMode(mode);
    if (accent) setAccent(accent);
    const token: string = localStorage.readToken();
    const user = localStorage.readUser();

    if (token && user) {
      setLoggedIn(true);
      setToken(token);
      setUser(user);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userID: user.userID,
        userName: user.userName,
        userSurname: user.userSurname,
        userNick: user.userNick,
        token,
        setUser,
        setToken,
      }}
    >
      <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
        <LoadingSpinnerContext.Provider value={{ isLoading, setIsLoading }}>
          <RouterProvider router={router} />
          {isLoading && <LoadingSPpinner fullScreen={true} />}
        </LoadingSpinnerContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
