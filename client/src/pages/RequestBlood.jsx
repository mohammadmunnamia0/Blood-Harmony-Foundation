import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestBlood = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [patientName, setPatientName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("");
  const [hospital, setHospital] = useState("");
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [requiredDate, setRequiredDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to submit a blood request");
        navigate("/login");
        return;
      }

      // Validate required fields
      const requiredFields = {
        patientName,
        bloodType,
        units,
        hospital,
        reason,
        urgency,
        contactName,
        contactPhone,
        requiredDate,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        setError(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
        return;
      }

      // Validate units is a positive number
      const unitsNum = Number(units);
      if (isNaN(unitsNum) || unitsNum < 1) {
        setError("Units must be a positive number");
        return;
      }

      // Validate urgency
      const validUrgencyLevels = ["emergency", "urgent", "normal"];
      if (!validUrgencyLevels.includes(urgency)) {
        setError("Invalid urgency level");
        return;
      }

      // Validate blood type
      const validBloodTypes = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ];
      if (!validBloodTypes.includes(bloodType)) {
        setError("Invalid blood type");
        return;
      }

      const response = await axios.post(
        "/api/blood-requests",
        {
          patientName,
          bloodType,
          units: unitsNum,
          hospital,
          reason,
          urgency,
          contactName,
          contactPhone,
          requiredDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Blood request submitted successfully!");
      // Reset form
      setPatientName("");
      setBloodType("");
      setUnits("");
      setHospital("");
      setReason("");
      setUrgency("normal");
      setContactName("");
      setContactPhone("");
      setRequiredDate("");
    } catch (error) {
      console.error("Error submitting blood request:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage =
          error.response.data.message || "Error submitting blood request";
        const errorDetails = error.response.data.errors;

        if (errorDetails && Array.isArray(errorDetails)) {
          setError(
            `${errorMessage}: ${errorDetails
              .map((err) => err.message)
              .join(", ")}`
          );
        } else {
          setError(errorMessage);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError(
          "No response from server. Please check your internet connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error submitting blood request. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Request Blood</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill out the form below to request blood
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
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
          )}

          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="patientName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bloodType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Type
                </label>
                <select
                  id="bloodType"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="units"
                  className="block text-sm font-medium text-gray-700"
                >
                  Units Required
                </label>
                <input
                  type="number"
                  id="units"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="hospital"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hospital
                </label>
                <input
                  type="text"
                  id="hospital"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason
                </label>
                <input
                  type="text"
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="urgency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Urgency
                </label>
                <select
                  id="urgency"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="requiredDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Required Date
                </label>
                <input
                  type="date"
                  id="requiredDate"
                  value={requiredDate}
                  onChange={(e) => setRequiredDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestBlood;
