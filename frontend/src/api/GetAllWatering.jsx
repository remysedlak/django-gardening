import axios from "axios";

const getWatering = async () => {
  let response;
  try {
    response = await axios.get("http://127.0.0.1:8000/plants_needing_water/");
    console.log("Plants that need watered:", response.data);
  } catch (error) {
    console.error(
      "Logging an Axios Error:",
      error.response ? error.response.data : error.message
    );
  }
  return response?.data || [];
};
export default getWatering;
