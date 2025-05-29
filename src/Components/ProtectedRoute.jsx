import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import AuthModal from "./AuthModal";

const ProtectedRoute = ({ children, requireDonorProfile = true }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [donorProfile, setDonorProfile] = useState(null);

  useEffect(() => {
    if (user && requireDonorProfile) {
      try {
        const profile = JSON.parse(
          localStorage.getItem(`donorInfo_${user.uid}`)
        );
        setDonorProfile(profile);
        setShouldRedirect(!profile);
      } catch (error) {
        console.error("Error checking donor profile:", error);
        setShouldRedirect(true);
      }
    }
  }, [user, requireDonorProfile]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthModal />;
  }

  if (shouldRedirect) {
    return <Navigate to="/donor-profile" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
