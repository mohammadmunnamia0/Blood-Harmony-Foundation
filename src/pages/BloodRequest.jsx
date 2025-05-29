import React from "react";
import { saveBloodDonation } from "../Utlity/LocalStorage";

const BloodRequest = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const donation = {
      id: Date.now(),
      name: form.name.value,
      bloodGroup: form.bloodGroup.value,
      units: form.units.value,
      date: form.date.value,
      hospital: form.hospital.value,
      contact: form.contact.value,
      address: form.address.value,
      reason: form.reason.value,
    };
    saveBloodDonation(donation);
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Blood Request Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Units Required</label>
            <input
              type="number"
              name="units"
              required
              min="1"
              className="w-full p-2 border rounded"
              placeholder="Number of units"
            />
          </div>
          <div>
            <label className="block mb-2">Date Required</label>
            <input
              type="date"
              name="date"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Hospital Name</label>
            <input
              type="text"
              name="hospital"
              required
              className="w-full p-2 border rounded"
              placeholder="Enter hospital name"
            />
          </div>
          <div>
            <label className="block mb-2">Contact Number</label>
            <input
              type="tel"
              name="contact"
              required
              className="w-full p-2 border rounded"
              placeholder="Enter contact number"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2">Address</label>
          <textarea
            name="address"
            required
            className="w-full p-2 border rounded"
            placeholder="Enter full address"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Reason for Blood</label>
          <textarea
            name="reason"
            required
            className="w-full p-2 border rounded"
            placeholder="Enter reason for blood requirement"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BloodRequest;
