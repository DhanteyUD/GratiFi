import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorBoundary,
  NotFound,
  Login,
  CreateAccount,
  LandingPage,
} from "../pages";

const router = createBrowserRouter([
  { path: "/*", element: <NotFound /> },
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
    errorElement: <ErrorBoundary />,
  },
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;
