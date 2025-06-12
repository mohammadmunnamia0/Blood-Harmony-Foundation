import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Static credentials
const STATIC_EMAIL = "donor@bloodbridge.com";
const STATIC_PASSWORD = "BloodBridge@123";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check if credentials match static values
      if (email !== STATIC_EMAIL || password !== STATIC_PASSWORD) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Check if user is registered
      const isRegistered = localStorage.getItem("isRegistered");
      if (!isRegistered) {
        setError("Please register as a donor first before logging in");
        setLoading(false);
        return;
      }

      // Get donor data from localStorage
      const donors = JSON.parse(localStorage.getItem("donors") || "[]");
      const donor = donors.find((d) => d.email === STATIC_EMAIL);

      if (!donor) {
        setError("Please register as a donor first before logging in");
        setLoading(false);
        return;
      }

      // Store authentication data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(donor));

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image and motivational text */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-red-800 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-xl mb-8">
            "Every drop of blood you donate is a lifeline for someone in need.
            Your generosity today could save a life tomorrow."
          </p>
          {/* <div className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1615461065921-4b7b7b1e0b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Blood donation illustration"
              className="rounded-lg shadow-2xl"
            />
          </div> */}
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600">
              <p className="text-lg text-green-600">
                Before login you must have to register as a donor.
              </p>{" "}
              Sign in to continue your journey of saving lives
            </p>

            {/* Static Credentials Display */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Static Credentials For Login
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

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out ${
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
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
