import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";

import { LoadingSpinnerContext } from "./context/LoadinSpinnerContext";

import LoadingSPpinner from "./components/LoadingSpinner";

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
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingSpinnerContext.Provider value={{ isLoading, setIsLoading }}>
      <RouterProvider router={router} />
      {isLoading && <LoadingSPpinner fullScreen={true} />}
    </LoadingSpinnerContext.Provider>
  );
};

export default App;
