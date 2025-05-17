import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LoadingProvider, useLoading } from "./components/ContextProvider";
import KwuoLoader from "./components/KwuoLoader";

// Lazy loaded components for code splitting
const AuthPage = lazy(() => import("./components/Register"));
const Dashboard = lazy(() => import("./components/DashBoard"));
const NotFound = lazy(() => import("./components/NotFound"));

// Layout wrapper to show/hide loader during route changes
const RouteChangeListener = ({ children }) => {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading("Loading page...", 800);
    return () => stopLoading();
  }, [location.pathname]); // Trigger on route change

  return <>{children}</>;
};

// Suspense fallback component
const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-green-50">
    <KwuoLoader size="large" text="Loading Kwuo🌿..." />
  </div>
);

// Private route component for protected routes
const PrivateRoute = ({ children }) => {
  // Check if user is authenticated - replace with your actual auth check
  const isAuthenticated = localStorage.getItem("kwuo_auth_token");

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Main App component
function App() {
  return (
    <Router>
      <LoadingProvider>
        <RouteChangeListener>
          <Suspense fallback={<SuspenseFallback />}>
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Protected routes */}
              <Route
                path="/dashboardmm"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Redirect to auth by default */}
              <Route path="/" element={<Navigate to="/auth" replace />} />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteChangeListener>
      </LoadingProvider>
    </Router>
  );
}

export default App;
