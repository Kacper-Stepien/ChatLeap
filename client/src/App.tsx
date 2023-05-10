import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";
import ErrorPage from "./pages/Error";
import "./App.scss";

import RootLayout from "./pages/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import User from "./pages/User";

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
        path: "user",
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
        setUser: setUser,
        setToken,
      }}
    >
      <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
