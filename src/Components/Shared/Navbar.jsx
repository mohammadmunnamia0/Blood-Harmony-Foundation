import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side - Logo/Website Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-red-600">
              BloodService
            </Link>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-red-600">
              Home
            </Link>
            <Link to="/hospitals" className="text-gray-700 hover:text-red-600">
              Hospitals
            </Link>
            <Link
              to="/organizations"
              className="border-transparent text-gray-500 hover:border-red-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Organizations
            </Link>
            {user && (
              <Link
                to="/request-blood"
                className="border-transparent text-gray-500 hover:border-red-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Request Blood
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Welcome</span>
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/register-donor"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Register as a Donor
                </Link>
                <Link
                  to="/login"
                  className="border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
