import {useState, useEffect} from 'react'
import axios from 'axios'

const getWatering = async () => {
  let response;
  try {
    response = await axios.get("http://localhost:8000/plants");
    console.log("Plants that need watered:", response.data);
  } catch (error) {
    console.error(
      "Logging an Axios Error:",
      error.response ? error.response.data : error.message
    );
  }
  return response?.data || [];
};

const NeedsRepotted = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWatering();
      console.log('Fetched data:', response);  // Add a log to check the data
      setResponse(response);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-2 bg-gray-200 rounded-xl w-full">
      <div className="flex flex-col gap-y-5">
        {response.length === 0 ? (
          <span className="w-full h-50 bg-orange-50 hover:bg-orange-100 rounded-xl border-gray-400 border-1 p-2">
            <h1 className="text-lg font-normal mt-2">Upcoming Repotting</h1>
            <p className="text-md mt-2">All plants are properly hydrated!</p>
          </span>
        ) : (
          response.map((plant, index) => (
            <span
              key={index}
              className="w-full h-50 bg-yellow-50 hover:bg-yellow-100 rounded-xl border-gray-400 border-1 p-2"
            >
              <h1 className="text-lg font-normal mt-2">{plant.name}</h1>
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default NeedsRepotted;
