import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import { FC } from "react";
import Friends from "./components/Friends";
import LoadingSpinner from "./components/LoadingSpinner";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Posts from "./components/Posts";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import RootLayout from "./pages/Root";
import Settings from "./components/Settings";
import User from "./pages/User";
import { useLoadingSpinner } from "./context/LoadinSpinnerContext";

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

const App: FC = () => {
  const { isLoading } = useLoadingSpinner();

  return (
    <>
      <RouterProvider router={router} />
      {isLoading && <LoadingSpinner fullScreen={true} />}
    </>
  );
};

export default App;
