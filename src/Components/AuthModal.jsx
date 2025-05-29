import React from "react";
import { Link } from "react-router-dom";

const AuthModal = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        {/* Modal */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {/* Message */}
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Please log in first to continue
            </h3>

            {/* Quote */}
            <div className="mt-4 rounded-lg bg-red-50 p-4">
              <p className="text-lg italic text-red-600">
                "You don't have to be a doctor to save lives. Just donate
                blood."
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Link
                to="/login"
                className="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Create Account
              </Link>
              <Link
                to="/"
                className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
