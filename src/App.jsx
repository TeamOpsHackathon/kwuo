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
import { Toaster, toast } from "react-hot-toast";

// Lazy loaded components for code splitting
const AuthPage = lazy(() => import("./features/auth/Register"));
// const CreatePostPage = lazy(() => import("./pages/CreatePostPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./features/auth/dashboard/DashBoard"));

const NotFound = lazy(() => import("./layout/NotFound"));
// const profile = lazy(() => import("./layout/NotFound"));

// Layout wrapper to show/hide loader during route changes
const RouteChangeListener = ({ children }) => {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading("Loading page...", 800);
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

// Simulated private route guard
const PrivateRoute = ({ children }) => {
  // Check if user is authenticated - replace with your actual auth check
  const isAuthenticated = localStorage.getItem("kwuo_auth_token");

  if (!isAuthenticated) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// App Entry
function App() {
  useEffect(() => {
    // Simulate login for testing
    if (!localStorage.getItem("kwuo_auth_token")) {
      localStorage.setItem("kwuo_auth_token", "demo_token_123");
      localStorage.setItem(
        "kwuo_user",
        JSON.stringify({ name: "Test User", id: 1 })
      );
      toast.success("Test user logged in");
    }
  }, []);

  return (
    <Router>
      <LoadingProvider>
        <RouteChangeListener>
          <Suspense fallback={<SuspenseFallback />}>
            <Routes>
              {/* Public route */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<HomePage />} />
              {/* <Route path="/post" element={<CreatePostPage />} /> */}

              {/* <Route path="/home" element={<HomePage />} /> */}

              {/* Protected routes */}
              <Route
                path="/dashboard.."
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path="/home.."
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              /> */}
              {/* <Route
                path="/create-post"
                element={
                  <PrivateRoute>
                    <CreatePostPage />
                  </PrivateRoute>
                }
              /> */}

              {/* Redirect root based on auth */}
              <Route
                path="/"
                element={
                  localStorage.getItem("kwuo_auth_token") ? (
                    <Navigate to="/auth" replace />
                  ) : (
                    <Navigate to="/home" replace />
                  )
                }
              />

              {/* Catch-all 404 */}
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
