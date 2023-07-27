import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { ThemeContext } from "./context/ThemeContext";
// import { AuthContext } from "./context/AuthContext";

import { LoadingSpinnerContext } from "./context/LoadinSpinnerContext";

import LoadingSPpinner from "./components/LoadingSpinner";
import LocalStorage from "./utils/LocalStorage";

import RootLayout from "./pages/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import User from "./pages/User";
import ErrorPage from "./pages/Error";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import Friends from "./components/Friends";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <ProtectedRoute element={<Main />} />,
        children: [
          {
            path: "",
            element: <Posts />,
          },
          {
            path: "/friends",
            element: <Friends />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
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
  const [isLoading, setIsLoading] = useState(false);

  const initializeApp = () => {
    const localStorage = new LocalStorage();
    const mode: string = localStorage.readMode();
    const accent: string = localStorage.readAccent();
    if (mode) setMode(mode);
    if (accent) setAccent(accent);
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      <LoadingSpinnerContext.Provider value={{ isLoading, setIsLoading }}>
        <RouterProvider router={router} />
        {isLoading && <LoadingSPpinner fullScreen={true} />}
      </LoadingSpinnerContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
