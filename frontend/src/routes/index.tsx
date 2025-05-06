import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary, NotFound, LandingPage } from "../pages";

const router = createBrowserRouter([
  { path: "/*", element: <NotFound /> },
  {
    path: "/login",
    // element: <Login />,
  },
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;
