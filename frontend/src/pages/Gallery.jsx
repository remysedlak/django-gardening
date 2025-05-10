import {useState, useEffect } from "react";
import ImageForm from "../components/forms/ImageForm";
import GetPhotos from "../api/GetAllPhotos";

const Gallery = () => {
  const [response, setResponse] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetPhotos();
      setResponse(response);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      {showPopup ? <ImageForm onToggle={() => setShowPopup(false)} /> : ``}
      <h1 className="text-2xl text-left bg-yellow-50 p-2  border-gray-400 border-1 shadow-md">
        Your Garden 
      </h1>
      <div className="mx-2 h-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 mt-4 ">
        {/* Upload Button */}
        <div
          className="max-w-lg p-4 border-dashed border-gray-400 border-1  bg-yellow-50 hover:bg-yellow-100 flex items-center justify-center cursor-pointer transition duration-100 ease-in-out"
          onClick={() => setShowPopup(true)}
        >
          <h1 className="text-xl font-normal cursor-pointer text-center">
            + Upload New Image
          </h1>
        </div>
        {/* Map all photos */}
        {response.map((photo) => {
          const formattedDate = new Date(photo.date_added).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <div
              key={photo.id}
              className="border flex flex-row justify-center items-center transition duration-100 ease-in-out cursor-pointer bg-yellow-50 hover:bg-yellow-100 max-w-lg"
            >
              <div className="flex flex-col">
                <img
                  src={`http://localhost:8000/${photo.image}`}
                  alt={`${photo.description} photo`}
                  className="w-32 border-1 border-gray-400 md:w-86 object-cover m-4"
                />
                <p className="text-gray-800 text-lg text-center mt-2 font-semibold">
                  {photo.description}
                </p>
                <p className="text-gray-500 text-sm text-center my-2">
                  Date: {formattedDate}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
