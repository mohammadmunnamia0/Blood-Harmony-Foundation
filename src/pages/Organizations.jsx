import React from "react";

const Organizations = () => {
  // This would typically come from an API or database
  const organizations = [
    {
      id: 1,
      name: "Red Crescent Society",
      description:
        "Leading humanitarian organization providing blood donation services",
      location: "Dhaka, Bangladesh",
      contact: "+880 1234567890",
      website: "www.redcrescent.org",
    },
    {
      id: 2,
      name: "Blood Donors Association",
      description: "Voluntary blood donation organization",
      location: "Chittagong, Bangladesh",
      contact: "+880 1234567891",
      website: "www.blooddonors.org",
    },
    {
      id: 3,
      name: "Life Savers Foundation",
      description:
        "Non-profit organization dedicated to blood donation awareness",
      location: "Sylhet, Bangladesh",
      contact: "+880 1234567892",
      website: "www.lifesavers.org",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Blood Donation Organizations
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div key={org.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {org.name}
              </h2>
              <p className="text-gray-600 mb-2">{org.description}</p>
              <p className="text-gray-600 mb-2">Location: {org.location}</p>
              <p className="text-gray-600 mb-2">Contact: {org.contact}</p>
              <a
                href={`https://${org.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organizations;
