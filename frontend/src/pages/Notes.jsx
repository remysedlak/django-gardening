import { useState, useEffect } from "react";
import axios from "axios";

const PostNote = () => {
    const [notes, setNotes] = useState([]);
    // const [newNote, setNewNote] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/notes`);
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchNotes();
    });
    return (
        <div className="bg-gray-900 flex items-center justify-center z-50 m-4">
            <div className="bg-yellow-50 flex flex-col p-3 shadow-lg border-2 border-gray-500 h-full m-2 w-full">
                <h1 className="text-2xl font-normal bg-yellow-100 py-5 border-2 border-gray-400 mb-2 text-center">All Notes</h1>
                <ul className="grid gap-5">
                    {notes.map((note) => (
                        <li key={note.index} className="items-center border w-min">
                            <span className="bg-pink-200 h-50 w-min flex flex-col items-center justify-top gap-y-5 items-center">
                                <span className="bg-pink-300 opacity-40 z-20 h-10 w-50 items-center"><span className="z-40 px-2 opacity-100 rounded-full bg-red-500 ml-22 "></span></span>
                                <p className="text-center mb-auto font-normal px-2 underline text-md">{note.name}:</p>
                                <p className="text-center">{note.content}</p>
                                <p className="text-center">{note.date_added}</p>
                            </span>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </div>
    );
};

export default PostNote;
