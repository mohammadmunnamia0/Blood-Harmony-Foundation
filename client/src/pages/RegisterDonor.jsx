import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Static credentials
const STATIC_EMAIL = "donor@bloodbridge.com";
const STATIC_PASSWORD = "BloodBridge@123";

const RegisterDonor = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      email: STATIC_EMAIL, // Using static email
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      bloodType: formData.get("bloodType"),
      weight: Number(formData.get("weight")),
      lastDonation: formData.get("lastDonation") || null,
      medicalConditions: formData.get("medicalConditions"),
      password: STATIC_PASSWORD, // Using static password
    };

    // Validate weight
    if (data.weight < 45) {
      setError("Weight must be at least 45 kg");
      setLoading(false);
      return;
    }

    try {
      // Store donor data in localStorage
      const donors = JSON.parse(localStorage.getItem("donors") || "[]");

      // Check if donor already exists
      const existingDonor = donors.find(
        (donor) => donor.email === STATIC_EMAIL
      );
      if (existingDonor) {
        setError(
          "A donor with these credentials already exists. Please login instead."
        );
        setLoading(false);
        return;
      }

      // Add new donor
      donors.push(data);
      localStorage.setItem("donors", JSON.stringify(donors));

      // Store authentication data
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("user", JSON.stringify(data));

      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Register as a Blood Donor
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Join our lifesaving mission by becoming a blood donor
            </p>

            {/* Static Credentials Display */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                 Credentials (Required for Registration  Login)
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Email:</span> {STATIC_EMAIL}
                </p>
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Password:</span>{" "}
                  {STATIC_PASSWORD}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
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
          )}

          {/* Form Container */}
          <div className="px-8 pb-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth *
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street Address *
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State *
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP Code *
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        required
                        className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Medical Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bloodType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Blood Type *
                    </label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      required
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
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
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Weight (kg) *
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      min="45"
                      required
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastDonation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Donation Date
                    </label>
                    <input
                      id="lastDonation"
                      name="lastDonation"
                      type="date"
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="medicalConditions"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Medical Conditions
                    </label>
                    <textarea
                      id="medicalConditions"
                      name="medicalConditions"
                      rows="3"
                      className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      placeholder="Please list any medical conditions or medications"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    "Register as Donor"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Registration Successful!
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                You have successfully registered as a blood donor. You will be
                redirected to the login page.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterDonor;
