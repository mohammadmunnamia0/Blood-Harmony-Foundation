import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import DonorProfileForm from "../components/DonorProfileForm";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";

const DonorProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [donorInfo, setDonorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const fetchDonorInfo = async () => {
      if (!user) return;

      try {
        // First try to get from localStorage
        const localDonorInfo = localStorage.getItem(`donorInfo_${user.uid}`);
        if (localDonorInfo) {
          setDonorInfo(JSON.parse(localDonorInfo));
          localStorage.setItem("hasDonorProfile", "true");
          setLoading(false);
        }

        // Then try Firestore
        try {
          const donorDoc = await getDoc(doc(db, "donors", user.uid));
          if (donorDoc.exists()) {
            const data = donorDoc.data();
            setDonorInfo(data);
            // Save to localStorage for offline access
            localStorage.setItem(`donorInfo_${user.uid}`, JSON.stringify(data));
            localStorage.setItem("hasDonorProfile", "true");
          } else {
            localStorage.setItem("hasDonorProfile", "false");
          }
        } catch (firestoreError) {
          console.error("Firestore error:", firestoreError);
          // If Firestore fails but we have local data, we're good
          if (!localDonorInfo) {
            toast.error("Unable to fetch profile. Working in offline mode.");
          }
        }
      } catch (error) {
        console.error("Error fetching donor info:", error);
        toast.error("Error loading profile. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDonorInfo();
    }
  }, [user, authLoading, navigate, location]);

  const handleEditSuccess = async (updatedData) => {
    try {
      setIsEditing(false);
      setDonorInfo(updatedData);
      // Save to localStorage for offline access
      localStorage.setItem(
        `donorInfo_${user.uid}`,
        JSON.stringify(updatedData)
      );
      localStorage.setItem("hasDonorProfile", "true");
      toast.success("Profile updated successfully!");

      // If there's a redirect path in location state, navigate to it
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {isEditing ? (
          <DonorProfileForm
            initialData={donorInfo}
            onSuccess={handleEditSuccess}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Donor Profile
              </h1>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Edit Profile
              </button>
            </div>
            {donorInfo ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.phone}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Blood Group
                    </h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.bloodGroup}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Address
                    </h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.address}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">City</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.city}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">State</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.state}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Emergency Contact
                    </h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {donorInfo.emergencyContact}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">
                  No Profile Found
                </h3>
                <p className="mt-2 text-gray-500">
                  Please create your donor profile to continue.
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Create Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
