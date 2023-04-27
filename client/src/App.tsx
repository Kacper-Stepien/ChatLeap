import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./sass/base.scss";
import { ThemeContext } from "./context/ThemeContext";
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
        element: <Main />,
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
        element: <User />,
      },
    ],
  },
]);

const App: React.FC = () => {
  const [mode, setMode] = useState("dark");
  const [accent, setAccent] = useState("Indigo");

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default App;
