import axios from "axios";
import { useEffect, useState } from "react";

const BloodRequestDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get the API URL based on environment
  const getApiUrl = async () => {
    if (import.meta.env.DEV) {
      // Try port 50001 first since that's where the server is running
      try {
        const response = await fetch(
          `http://localhost:50001/api/blood-requests`
        );
        if (response.ok) {
          return `http://localhost:50001/api/blood-requests`;
        }
      } catch (error) {
        console.log("Port 50001 not available, trying other ports...");
      }

      // Fallback to trying other ports
      for (let port = 5000; port <= 5010; port++) {
        if (port === 50001) continue; // Skip 50001 since we already tried it
        try {
          const response = await fetch(
            `http://localhost:${port}/api/blood-requests`
          );
          if (response.ok) {
            return `http://localhost:${port}/api/blood-requests`;
          }
        } catch (error) {
          console.log(`Port ${port} not available, trying next...`);
          continue;
        }
      }
      throw new Error("No available server ports found");
    }
    return "https://bloodbridge-server.vercel.app/api/blood-requests";
  };

  // Static fake data
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
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");
        console.log("Starting to fetch blood requests...");
        const API_URL = await getApiUrl();
        console.log("Using API URL:", API_URL);

        // Test the API endpoint first
        try {
          const testResponse = await fetch(API_URL);
          console.log("Test response status:", testResponse.status);
          console.log(
            "Test response headers:",
            Object.fromEntries(testResponse.headers.entries())
          );
        } catch (testError) {
          console.error("Test request failed:", testError);
        }

        const response = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: false,
          timeout: 5000,
        });

        console.log("Full response:", response);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        console.log("Blood requests response data:", response.data);

        if (response.data && Array.isArray(response.data)) {
          console.log("Setting requests with data:", response.data);
          setRequests(response.data);
        } else {
          console.error("Invalid response format:", response.data);
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
          setError(
            `Failed to load blood requests: ${
              error.response.data.message || error.message
            }`
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          setError(
            "No response from server. Please check if the server is running."
          );
        } else {
          console.error("Error setting up request:", error.message);
          setError(`Failed to load blood requests: ${error.message}`);
        }
        console.log("Falling back to static data");
        setRequests(staticRequests);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
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
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Blood Request Dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              View all blood donation requests
            </p>
          </div>

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
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.patientName}
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
