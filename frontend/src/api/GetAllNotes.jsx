import axios from "axios";

const getNotes = async () => {
  let response;
  try {
    response = await axios.get("http://127.0.0.1:8000/notes");
    console.log("Notes:", response.data);
  } catch (error) {
    console.error(
      "Axios Error:",
      error.response ? error.response.data : error.message
    );
  }
  return response?.data || [];
};
export default getNotes;
