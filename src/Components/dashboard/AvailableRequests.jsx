import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

const AvailableRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expressingInterest, setExpressingInterest] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsRef = collection(db, "bloodRequests");
        const q = query(requestsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const requestsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user]);

  const handleExpressInterest = async (requestId) => {
    try {
      setExpressingInterest(true);
      const requestRef = doc(db, "bloodRequests", requestId);
      const request = requests.find((r) => r.id === requestId);

      // Add user to interested donors if not already present
      const updatedInterestedDonors = [...(request.interestedDonors || [])];
      if (!updatedInterestedDonors.includes(user.uid)) {
        updatedInterestedDonors.push(user.uid);
      }

      await updateDoc(requestRef, {
        interestedDonors: updatedInterestedDonors,
        lastUpdated: new Date().toISOString(),
      });

      // Update local state
      setRequests(
        requests.map((request) =>
          request.id === requestId
            ? { ...request, interestedDonors: updatedInterestedDonors }
            : request
        )
      );
    } catch (error) {
      console.error("Error expressing interest:", error);
    } finally {
      setExpressingInterest(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">
          No blood requests available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white shadow rounded-lg p-6 border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Blood Group: {request.bloodGroup}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Units Needed: {request.unitsNeeded}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Hospital: {request.hospital}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Location: {request.location}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Required By: {new Date(request.requiredBy).toLocaleDateString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Status:{" "}
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Interested Donors: {request.interestedDonors?.length || 0}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {request.userId !== user.uid && (
                <button
                  onClick={() => handleExpressInterest(request.id)}
                  disabled={
                    expressingInterest ||
                    request.interestedDonors?.includes(user.uid)
                  }
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    request.interestedDonors?.includes(user.uid)
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  }`}
                >
                  {request.interestedDonors?.includes(user.uid)
                    ? "Interest Expressed"
                    : "Express Interest"}
                </button>
              )}
            </div>
          </div>
          {request.notes && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Additional Notes:</span>{" "}
                {request.notes}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvailableRequests;
