import { useEffect, useState, React } from "react";
import GetPhotos from "../../api/GetAllPhotos";

const RecentGallery = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetPhotos();
      setResponse(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="md:ml-8 justify-between">
        <h1 className="text-2xl text-center md:text-left my-2">
          Recent Gallery
        </h1>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-3 gap-y-3">
          {response.slice(0, 4).map((photo) => (
            <div
              key={`${photo.id}`}
              className="items-center gap-x-4 p-2 border-gray-400 border-1 flex flex-row md:flex-col justify-center hover:bg-yellow-100 transition duration-100 ease-in-out cursor-pointer bg-yellow-50"
            >
              <img
                src={"http://localhost:8000/".concat(photo.image)}
                alt={`${photo.description} photo`}
                className="h-32 w-32 md:h-64 md:w-64 object-cover"
              />
              <div className="flex flex-col md:flex-row justify-around gap-x-8">
                <p className="text-gray-800 font-semibold text-md mt-2">
                  {photo.description}
                </p>
                <p className="text-gray-500 text-md mt-2">
                  Date: {photo.date_added}
                </p>
              </div>
              <div />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RecentGallery;
