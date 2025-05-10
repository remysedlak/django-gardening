import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageForm = ({ onToggle }) => {
  const [plants, setPlants] = useState([]);
  const [formData, setFormData] = useState({
    plant: "",
    description: "",
    date_added: new Date().toISOString().split("T")[0], // YYYY-MM-DD
  });
  const [imageFile, setImageFile] = useState(null);

  // Fetch plant options on mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/plants") // Adjust this endpoint based on your backend
      .then((res) => setPlants(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("plant", formData.plant);
    data.append("image", imageFile);
    data.append("description", formData.description);
    data.append("date_added", formData.date_added);

    try {
      await axios.post("http://127.0.0.1:8000/upload_photo/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-gray-200 flex flex-col p-6 rounded-lg shadow-lg w-240 border border-gray-400">
        <h2 className="text-xl font-normal mb-4">Add New Plant</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col space-y-12"
        >
          <label>
            Plant:
            <select
              name="plant"
              value={formData.plant}
              onChange={handleChange}
              className="bg-blue-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option
                value=""
                className="bg-blue-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                Select a plant
              </option>
              {plants.map((plant) => (
                <option
                  className="rounded-full bg-blue-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  key={plant.id}
                  value={plant.id}
                >
                  {plant.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-blue-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-blue-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <label>
            Date Added:
            <input
              type="date"
              name="date_added"
              value={formData.date_added}
              onChange={handleChange}
              className="bg-blue-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded mr-2 border border-gray-400 cursor-pointer"
              onClick={onToggle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded border border-gray-400 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (formData.plant && formData.description && imageFile) {
                  handleSubmit(e).then(() => {
                    onToggle();
                    window.location.reload();
                  });
                } else {
                  alert("Please fill out all fields before submitting.");
                }
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageForm;
