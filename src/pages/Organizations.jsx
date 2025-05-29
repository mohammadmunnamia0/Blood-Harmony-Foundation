import { useState } from "react";
import { organizationsData } from "../utils/organizationsData";

const Organizations = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Organizations", icon: "🏢" },
    { id: "national", name: "National", icon: "🏥" },
    { id: "hospital", name: "Hospital", icon: "🏨" },
    { id: "digital", name: "Digital", icon: "💻" },
  ];

  const filteredOrganizations =
    activeCategory === "all"
      ? [
          ...organizationsData.national,
          ...organizationsData.hospital,
          ...organizationsData.digital,
        ]
      : organizationsData[activeCategory] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-red-600">
        Blood Donation Organizations
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center gap-2
              ${
                activeCategory === category.id
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrganizations.map((org) => (
          <div
            key={org.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{org.icon}</span>
                <h2 className="text-xl font-bold text-gray-800">{org.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{org.description}</p>
              {org.contact && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Contact:</span> {org.contact}
                </p>
              )}
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
