import { Link } from "react-router-dom";

const Navbar = () => {
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
              className="text-gray-700 hover:text-red-600"
            >
              Organizations
            </Link>
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
