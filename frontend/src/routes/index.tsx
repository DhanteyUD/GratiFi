import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary, NotFound, Login, LandingPage } from "../pages";

const router = createBrowserRouter([
  { path: "/*", element: <NotFound /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;
