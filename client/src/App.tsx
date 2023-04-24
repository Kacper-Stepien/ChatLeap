import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./sass/base.scss";
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
  return <RouterProvider router={router} />;
};

export default App;
