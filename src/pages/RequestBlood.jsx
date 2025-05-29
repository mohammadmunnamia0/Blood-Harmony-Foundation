import { useState } from "react";
import axios from "axios";

const RequestBlood = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      patientName: formData.get("patientName"),
      bloodType: formData.get("bloodType"),
      units: formData.get("units"),
      hospital: formData.get("hospital"),
      reason: formData.get("reason"),
      urgency: formData.get("urgency"),
      contactName: formData.get("contactName"),
      contactPhone: formData.get("contactPhone"),
      requiredDate: formData.get("requiredDate"),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/blood-requests", data);
      setSuccess(true);
      e.target.reset();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Request Blood</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill out the form below to request blood for a patient
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Blood request submitted successfully!</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Information */}
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                  Patient Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  id="patientName"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                  Blood Type Required *
                </label>
                <select
                  name="bloodType"
                  id="bloodType"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select blood type</option>
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
                <label htmlFor="units" className="block text-sm font-medium text-gray-700">
                  Units Required *
                </label>
                <input
                  type="number"
                  name="units"
                  id="units"
                  min="1"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">
                  Hospital Name *
                </label>
                <input
                  type="text"
                  name="hospital"
                  id="hospital"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
                  Urgency Level *
                </label>
                <select
                  name="urgency"
                  id="urgency"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select urgency</option>
                  <option value="emergency">Emergency (Within 24 hours)</option>
                  <option value="urgent">Urgent (Within 48 hours)</option>
                  <option value="normal">Normal (Within a week)</option>
                </select>
              </div>

              <div>
                <label htmlFor="requiredDate" className="block text-sm font-medium text-gray-700">
                  Required Date *
                </label>
                <input
                  type="date"
                  name="requiredDate"
                  id="requiredDate"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason for Blood Requirement *
                </label>
                <textarea
                  name="reason"
                  id="reason"
                  rows="3"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>

              {/* Contact Information */}
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  id="contactName"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  id="contactPhone"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestBlood; 