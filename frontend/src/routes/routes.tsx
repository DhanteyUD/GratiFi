import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorBoundary,
  NotFound,
  Login,
  CreateAccount,
  LandingPage,
  Home,
  PostView,
  Explore,
  Messages,
  Wallet,
  Notifications,
  Bookmarks,
  Communities,
  Profile,
  SupportHistory,
  MyCreators,
  TipsReceived,
  MySupporters,
  Analytics,
  Jobs,
  SettingsAndPrivacy,
} from "../pages";
import { AuthGuard } from "@/guard/AuthGuard";
import { AppProvider } from "@/context/AppContext";
import ScreenLayout from "@/layout/ScreenLayout";

const withAuth = (element: React.ReactNode, layout = true) => (
  <AuthGuard>
    <AppProvider>
      {layout ? (
        <ScreenLayout goBack={() => window.history.back()}>
          {element}
        </ScreenLayout>
      ) : (
        element
      )}
    </AppProvider>
  </AuthGuard>
);

const router = createBrowserRouter([
  { path: "/*", element: <NotFound /> },

  // Onboarding
  { path: "/", element: <LandingPage />, errorElement: <ErrorBoundary /> },
  { path: "/login", element: <Login />, errorElement: <ErrorBoundary /> },
  {
    path: "/create-account",
    element: <CreateAccount />,
    errorElement: <ErrorBoundary />,
  },

  // Authenticated + Layout routes
  {
    path: "/home",
    element: withAuth(<Home />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/:username/:id",
    element: withAuth(<PostView />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/explore",
    element: withAuth(<Explore />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/notifications",
    element: withAuth(<Notifications />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/wallet",
    element: withAuth(<Wallet />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/messages",
    element: withAuth(<Messages />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/bookmarks",
    element: withAuth(<Bookmarks />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/communities",
    element: withAuth(<Communities />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/:username",
    element: withAuth(<Profile />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/history",
    element: withAuth(<SupportHistory />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/creators",
    element: withAuth(<MyCreators />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/tips",
    element: withAuth(<TipsReceived />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/supporters",
    element: withAuth(<MySupporters />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/analytics",
    element: withAuth(<Analytics />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/jobs",
    element: withAuth(<Jobs />),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/settings",
    element: withAuth(<SettingsAndPrivacy />),
    errorElement: <ErrorBoundary />,
  },
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;
