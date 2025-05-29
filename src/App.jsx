import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import BloodRequest from "./pages/BloodRequest";
import DonorProfile from "./pages/DonorProfile";
import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";
import Login from "./pages/Login";
import Organizations from "./pages/Organizations";
import Register from "./pages/Register";

// Loading component
const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-red-600"></div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="mb-4 text-gray-600">Please try refreshing the page</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Wait for any initial setup
        await new Promise((resolve) => setTimeout(resolve, 100));
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsInitialized(true); // Still set to true to show error boundary
      }
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/organizations" element={<Organizations />} />

              {/* Protected Routes */}
              <Route
                path="/donor-profile"
                element={
                  <ProtectedRoute>
                    <DonorProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/request-blood"
                element={
                  <ProtectedRoute requireDonorProfile>
                    <BloodRequest />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
