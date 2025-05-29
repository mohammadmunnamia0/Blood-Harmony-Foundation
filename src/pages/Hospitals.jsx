import { useState } from "react";
import {
  FaAmbulance,
  FaGlobe,
  FaHospital,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { hospitals } from "../Utlity/hospitals";

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter((hospital) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      hospital.name.toLowerCase().includes(searchLower) ||
      hospital.address.toLowerCase().includes(searchLower) ||
      (hospital.emergencyHotline &&
        hospital.emergencyHotline.toLowerCase().includes(searchLower)) ||
      (hospital.emergencyContact &&
        hospital.emergencyContact.toLowerCase().includes(searchLower)) ||
      (hospital.ambulance &&
        hospital.ambulance.toLowerCase().includes(searchLower)) ||
      (hospital.contact && hospital.contact.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Dhaka Hospitals
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find comprehensive information about major hospitals in Dhaka,
            including emergency contacts, addresses, and more.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaHospital className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Found {filteredHospitals.length} hospitals matching your search
              </p>
            )}
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {hospital.name}
                </h2>

                <div className="space-y-3">
                  {/* Emergency Contact */}
                  {(hospital.emergencyHotline || hospital.emergencyContact) && (
                    <div className="flex items-start space-x-3">
                      <FaPhone className="text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Emergency Contact
                        </p>
                        <p className="text-gray-600">
                          {hospital.emergencyHotline ||
                            hospital.emergencyContact}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Ambulance */}
                  {hospital.ambulance && (
                    <div className="flex items-start space-x-3">
                      <FaAmbulance className="text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Ambulance
                        </p>
                        <p className="text-gray-600">{hospital.ambulance}</p>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Address
                      </p>
                      <p className="text-gray-600">{hospital.address}</p>
                    </div>
                  </div>

                  {/* Website */}
                  {hospital.website && (
                    <div className="flex items-start space-x-3">
                      <FaGlobe className="text-purple-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Website
                        </p>
                        <a
                          href={hospital.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Get Directions
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                  Emergency
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {searchQuery && filteredHospitals.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-600 text-lg">
              No hospitals found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
