import { useState, useEffect } from "react";
import axios from "axios";

const PostNote = ({ onToggle, plantId, plantName }) => {
    const [notes, setNotes] = useState([]);
    // const [newNote, setNewNote] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/plants/${plantId}/notes`);
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchNotes();
    }, [plantId]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(`http://127.0.0.1:8000/plants/${plantId}/notes`, {
    //             note: newNote,
    //         });
    //         setNotes((prevNotes) => [...prevNotes, response.data]);
    //         setNewNote("");
    //         onToggle(); // Close the form after successful submission
    //     } catch (error) {
    //         console.error("Error adding note:", error);
    //     }
    // };

    return (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-gray-900 flex items-center justify-center z-50">
            <div className="bg-yellow-50 p-3 mx-4 shadow-lg w-240 border-2 border-gray-500">
                <h2 className="text-xl font-normal mb-4">Notes for {plantName}</h2>
                <ul className="mb-4">
                    {notes.map((note, index) => (
                        <li key={index} className="mb-2">
                            {note.content}
                            {note.date_added}
                        </li>
                    ))}
                </ul>
                {/* <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="note"
                        >
                            Add a Note
                        </label>
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Write a new note..."
                            className="note-input w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 mr-2 border border-gray-400 cursor-pointer"
                            onClick={onToggle}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 border border-gray-400 cursor-pointer"
                        >
                            Save Notes
                        </button>
                    </div>
                </form> */}
            </div>
        </div>
    );
};

export default PostNote;
