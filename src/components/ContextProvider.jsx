import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { LoadingProvider, useLoading } from "./components/ContextProvider";
import KwuoLoader from "./components/KwuoLoader";
import { Toaster, toast } from "react-hot-toast";

// Lazy loaded components
const Register = lazy(() => import("./features/auth/Register"));
const Login = lazy(() => import("./features/auth/Login"));
const Dashboard = lazy(() => import("./features/auth/dashboard/DashBoard"));
const NotFound = lazy(() => import("./layout/NotFound"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CreatePostPage = lazy(() => import("./pages/CreatePostPage"));

// Route change loader
const RouteChangeListener = ({ children }) => {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();

  React.useEffect(() => {
    startLoading("Loading page...", 800);
    return () => stopLoading();
  }, [location.pathname]);

  return <>{children}</>;
};

// Suspense fallback loader
const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-green-50">
    <KwuoLoader size="large" text="Loading Kwuo🌿..." />
  </div>
);

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("kwuo_auth_token");
  if (!isAuthenticated) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <LoadingProvider>
        <RouteChangeListener>
          <Suspense fallback={<SuspenseFallback />}>
            <Routes>
              {/* Auth routes */}
              <Route path="/auth" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-post"
                element={
                  <PrivateRoute>
                    <CreatePostPage />
                  </PrivateRoute>
                }
              />

              {/* Redirect root */}
              <Route
                path="/"
                element={
                  localStorage.getItem("kwuo_auth_token") ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteChangeListener>
      </LoadingProvider>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
