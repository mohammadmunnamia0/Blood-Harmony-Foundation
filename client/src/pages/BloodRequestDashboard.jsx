import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

const BloodRequestDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Static dummy data
  const staticRequests = [
    {
      _id: "static1",
      patientName: "John Smith",
      bloodType: "O+",
      units: 2,
      hospital: "City General Hospital",
      urgency: "emergency",
      requiredDate: new Date(Date.now() + 86400000), // tomorrow
      status: "pending",
      contactName: "Sarah Smith",
      contactPhone: "+1 234-567-8901",
      isStatic: true,
      createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    },
    {
      _id: "static2",
      patientName: "Maria Garcia",
      bloodType: "A-",
      units: 3,
      hospital: "St. Mary's Medical Center",
      urgency: "urgent",
      requiredDate: new Date(Date.now() + 172800000), // day after tomorrow
      status: "approved",
      contactName: "Carlos Garcia",
      contactPhone: "+1 234-567-8902",
      isStatic: true,
      createdAt: new Date(Date.now() - 86400000 * 4), // 4 days ago
    },
    {
      _id: "static3",
      patientName: "David Chen",
      bloodType: "B+",
      units: 1,
      hospital: "Metropolitan Hospital",
      urgency: "normal",
      requiredDate: new Date(Date.now() + 259200000), // 3 days from now
      status: "fulfilled",
      contactName: "Lisa Chen",
      contactPhone: "+1 234-567-8903",
      isStatic: true,
      createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    },
    {
      _id: "static4",
      patientName: "Emma Wilson",
      bloodType: "AB+",
      units: 4,
      hospital: "Children's Hospital",
      urgency: "emergency",
      requiredDate: new Date(Date.now() + 43200000), // 12 hours from now
      status: "pending",
      contactName: "James Wilson",
      contactPhone: "+1 234-567-8904",
      isStatic: true,
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    },
    {
      _id: "static5",
      patientName: "Michael Brown",
      bloodType: "O-",
      units: 2,
      hospital: "Regional Medical Center",
      urgency: "urgent",
      requiredDate: new Date(Date.now() + 345600000), // 4 days from now
      status: "pending",
      contactName: "Jennifer Brown",
      contactPhone: "+1 234-567-8905",
      isStatic: true,
      createdAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
    },
    {
      _id: "static6",
      patientName: "Sophia Lee",
      bloodType: "A+",
      units: 3,
      hospital: "Memorial Hospital",
      urgency: "normal",
      requiredDate: new Date(Date.now() + 518400000), // 6 days from now
      status: "approved",
      contactName: "Robert Lee",
      contactPhone: "+1 234-567-8906",
      isStatic: true,
      createdAt: new Date(Date.now() - 86400000 * 0.5), // 12 hours ago
    },
    {
      _id: "static7",
      patientName: "James Wilson",
      bloodType: "B-",
      units: 2,
      hospital: "Community Hospital",
      urgency: "emergency",
      requiredDate: new Date(Date.now() + 86400000), // tomorrow
      status: "pending",
      contactName: "Emily Wilson",
      contactPhone: "+1 234-567-8907",
      isStatic: true,
      createdAt: new Date(Date.now() - 86400000 * 0.25), // 6 hours ago
    },
  ];

  const handleRequestBlood = () => {
    // Check if user is registered
    const isRegistered = localStorage.getItem("isAuthenticated") === "true";

    if (!isRegistered) {
      setShowModal(true);
    } else {
      navigate("/register-donor");
    }
  };

  useEffect(() => {
    const loadRequests = () => {
      try {
        setLoading(true);
        setError("");

        // Get user requests from localStorage
        const userRequests = JSON.parse(
          localStorage.getItem("bloodRequests") || "[]"
        );

        // Ensure user requests have isStatic flag set to false
        const processedUserRequests = userRequests.map((request) => ({
          ...request,
          isStatic: false,
        }));

        // Combine user requests with static requests, ensuring user requests come first
        const allRequests = [...processedUserRequests, ...staticRequests];

        // Sort all requests by createdAt (newest first)
        const sortedRequests = allRequests.sort((a, b) => {
          // Always put non-static (user) requests first
          if (!a.isStatic && b.isStatic) return -1;
          if (a.isStatic && !b.isStatic) return 1;
          // Then sort by date
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setRequests(sortedRequests);
      } catch (error) {
        console.error("Error loading blood requests:", error);
        setError("Failed to load blood requests");
        // Fallback to static data
        setRequests(staticRequests);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();

    // Listen for new blood requests
    const handleStorageChange = (e) => {
      if (e.key === "bloodRequests") {
        const userRequests = JSON.parse(e.newValue || "[]");
        // Ensure user requests have isStatic flag set to false
        const processedUserRequests = userRequests.map((request) => ({
          ...request,
          isStatic: false,
        }));
        // Combine user requests with static requests
        const allRequests = [...processedUserRequests, ...staticRequests];
        // Sort all requests
        const sortedRequests = allRequests.sort((a, b) => {
          // Always put non-static (user) requests first
          if (!a.isStatic && b.isStatic) return -1;
          if (a.isStatic && !b.isStatic) return 1;
          // Then sort by date
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setRequests(sortedRequests);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "fulfilled":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 text-red-800";
      case "urgent":
        return "bg-orange-100 text-orange-800";
      case "normal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blood requests...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blood Requests</h1>
          <div className="flex gap-4">
            <button
              onClick={handleRequestBlood}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Request Blood
            </button>
          </div>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message="Can't request blood without Register then login"
          buttonText="Register As Donor"
          buttonAction="/register-donor"
        />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Required Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr
                    key={request._id}
                    className={`hover:bg-gray-50 ${
                      !request.isStatic ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.patientName}
                        {!request.isStatic && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.bloodType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.units}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.hospital}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(
                          request.urgency
                        )}`}
                      >
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(request.requiredDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.contactName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.contactPhone}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {requests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No blood requests found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequestDashboard;
