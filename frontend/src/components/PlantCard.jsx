import NotesForm from "../components/forms/NotesForm";
import { useState } from "react";

const PlantCard = ({ plant }) => {
  const [showNotes, setShowNotes] = useState(false);

  const acquiredDate = new Date(plant.acquired_date);
  const today = new Date();
  const diffTime = Math.abs(today - acquiredDate);
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  const diffDays = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-yellow-50 hover:bg-yellow-100 transition duration-300 ease-in-out p-4 text-left border-gray-400 hover:border-yellow-800 border w-full relative">
      {showNotes && (
        <NotesForm
          onToggle={() => setShowNotes(false)}
          plantName={plant.name}
          plantId={plant.id}
        />
      )}
      <div className="flex flex-row justify-between">
        <div>
          <div className="flex flex-row">
            <h2 className="text-xl font-semibold">{plant.name}</h2>
            <p className="text-gray-800 bg-green-50 border-gray-400 border-1 px-1 w-min ml-2">
              {plant.species}
            </p>
          </div>
          <p className="text-gray-800 text-lg font-normal">
            {plant.scientific_name}
          </p>
          <p className="text-gray-600 text-md">
            Age: {diffYears > 0 ? `${diffYears} yrs` : ""}
            {diffMonths > 0 ? ` ${diffMonths} mo` : ""}
            {diffDays > 0 ? ` ${diffDays} days` : ""}
          </p>
          <p className="text-gray-600 text-md">Location: {plant.location}</p>
          <p className="text-gray-600 text-md">
            Water every {plant.watering_interval_days} days
          </p>
          <p className="text-gray-600 text-md">
            Last watered on {plant.last_watered}
          </p>

          <div className="my-4"></div>
          <p
            className="text-gray-700 text-md underline cursor-pointer hover:text-blue-700 absolute bottom-2"
            onClick={() => setShowNotes(true)}
          >
            Notes
          </p>
        </div>

        <div className="flex flex-col gap-y-2">
          {plant.latest_image ? (
            <img
              src={`http://localhost:8000${plant.latest_image.image}`}
              alt={plant.latest_image.description || "Plant image"}
              className="w-full h-24 md:w-48 md:h-48 object-cover border border-gray-400 cursor-pointer max-w-32 max-h-32 md:max-w-48 md:max-h-48 bg-gray-200"
              onClick={() =>
                window.open(
                  `http://localhost:8000${plant.latest_image.image}`,
                  "_blank"
                )
              }
            />
          ) : (
            <img
              src="https://placehold.co/600x400?text=No+image+found"
              alt="No image found"
              className="w-full h-24 md:w-48 md:h-48 object-cover border-gray-400 border md:max-w-48 md:max-h-48"
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default PlantCard;