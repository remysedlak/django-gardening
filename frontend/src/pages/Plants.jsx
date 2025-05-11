import { useState, useEffect } from "react";
import GetPlants from "../api/GetAllPlants";
import PlantForm from "../components/forms/PlantForm";
import NotesForm from "../components/forms/NotesForm";
import PlantCard from "../components/PlantCard";

const Plants = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetPlants();
      setResponse(response);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row bg-yellow-50 p-2 m-2 text-left border-gray-400 border-1 shadow-m justify-center items-center">
        <p className="text-2xl font-semibold ">Your Garden </p>
        <button className="ml-auto text-lg border-gray-400 border px-2 hover:bg-blue-50 bg-gray-100 cursor-pointer">filter</button>
      </div>
      <div className=" h-full p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4 mt-4 ">
        {/* Upload Button */}
        <div
          className="w-full p-2 border-dashed border-gray-400 border-1  bg-yellow-50 hover:bg-yellow-100 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out"
          onClick={() => setShowPopup(true)}
        >
          <h1 className="text-xl font-normal cursor-pointer text-center">
            + Add New Plant
          </h1>
        </div>
        {/* Map all plants */}
        {showPopup && <PlantForm onToggle={() => setShowPopup(false)} />}
        {response.map((plant) => {
          return (
          <PlantCard
            plant={plant}
           />);
        })}
      </div>
    </div>
  );
};

export default Plants;
