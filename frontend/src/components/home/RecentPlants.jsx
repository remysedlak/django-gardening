import React from "react";
import { useEffect, useState } from "react";
import GetPlants from "../../api/GetAllPlants";

const Recent = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetPlants();
      setResponse(response);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-sm text-center ">
      <h1 className="text-2xl my-2 font-normal text-center md:text-left">
        Recently Viewed Plants
      </h1>
      <div className="mt-4 flex flex-col md:flex-col gap-y-2 items-center">
        {response.slice(0, 4).map((plant) => (
          <div
            key={plant.id}
            className="bg-yellow-50 w-full md:w-96 hover:bg-yellow-100 transition duration-100 ease-in-out p-2 text-left border-gray-400 border-1 "
          >
            <h2 className="text-xl inline">{plant.name}</h2>
            <p className="text-gray-700">
              {plant.scientific_name + ` • ` + plant.species}
            </p>
            <p className="text-gray-500 text-sm">Location: {plant.location}</p>
            <p className="text-gray-500 text-sm">
              Water: {plant.watering_interval_days}
            </p>
            <p className="text-gray-500 text-sm">
              Last Watered: {plant.last_watered}
            </p>
            <p className="text-gray-500 text-sm">{plant.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
