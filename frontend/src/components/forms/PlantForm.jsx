import React, { useState } from "react";
import axios from "axios";

const PostPlant = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    scientific_name: "",
    acquired_date: "",
    location: "",
    watering_interval_days: "",
    last_watered: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload_plant/",
        formData
      );
      console.log("Plant added successfully:", response.data);
      onToggle(); // Close the form after successful submission
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-gray-900 flex items-center justify-center z-50">
      <div className="bg-yellow-50 p-3 mx-4 shadow-lg w-240 border-2 border-gray-500">
        <h2 className="text-xl font-normal mb-4">Add New Plant</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="species"
            >
              Species
            </label>
            <select
              id="species"
              value={formData.species}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a species</option>
              <option value="succulent">Succulent</option>
              <option value="fern">Fern</option>
              <option value="flower">Flower</option>
              <option value="tree">Tree</option>
              <option value="herb">Herb</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="scientificName"
            >
              Scientific Name
            </label>
            <input
              type="text"
              id="scientific_name"
              value={formData.scientific_name}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="acquiredDate"
            >
              Acquired Date
            </label>
            <input
              type="date"
              id="acquired_date"
              value={formData.acquired_date}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="wateringInterval"
            >
              Watering Interval (Days)
            </label>
            <input
              type="number"
              id="watering_interval_days"
              value={formData.watering_interval_days}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastWatered"
            >
              Last Watered
            </label>
            <input
              type="date"
              id="last_watered"
              value={formData.last_watered}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="notes"
            >
              Notes
            </label>
            <input
              type="text"
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              className="bg-gray-200 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-700 hover:bg-red-600 text-white px-4 py-2  mr-2 border border-gray-400 cursor-pointer"
              onClick={onToggle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" bg-green-700 hover:bg-green-600 text-white px-4 py-2border border-gray-400 cursor-pointer"
            >
              Upload Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostPlant;
