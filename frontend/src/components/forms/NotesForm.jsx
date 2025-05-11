import { useState, useEffect } from "react";
import axios from "axios";
import StickyNote from "../StickyNote";

const PostNote = ({ plantId, plantName, onToggle }) => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/plants/${plantId}/notes/`);
                console.log(`plant id notes fetched: " ${plantId}`); // Log the fetched notes
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchNotes();
    }, [plantId]);
    
    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 h-full">
            <div className=" flex flex-col bg-yellow-50 border p-3 shadow-lg h-14/15 w-9/10">
                <h1 className="text-2xl text-center font-normal m-6 bg-yellow-100 py-5 border border-gray-400">Notes for {plantName}</h1>
                <ul className="mb-4 grid">
                    {/* display existing notes */}
                    {notes.map((note, index) => (
                        
                        <li key={index} className="mb-2 items-center border border-gray-400 w-min">
                            <span className="bg-pink-200 h-50 w-min flex flex-col items-center justify-top gap-y-5 items-center">
                                <span className="bg-pink-300 opacity-40 z-20 h-10 w-50 items-center"><span className="z-40 px-2 opacity-100 rounded-full bg-red-500 ml-22 "></span></span>
                                <p>{note.content}</p>
                                <p>{note.date_added}</p>
                            </span>
                        </li>
                    ))} 
                    {/* upload new note */}
                    <span className="border border-gray-400 bg-pink-200 h-50 w-min flex flex-col items-center justify-top gap-y-5 items-center">
                        <span className="bg-pink-300 opacity-40 z-20 h-10 w-50 items-center"><span className="z-40 px-2 opacity-100 rounded-full bg-red-500 ml-22 "></span></span>
                        <input type="text" className="text-gray-500 border border-pink-200 px-2 w-full" placeholder="note"></input>
                        <input type="date" className="text-gray-500 border border-pink-200 px-2 w-full" placeholder="date"></input>
                        <button type="submit" className="mt-auto ml-auto m-2 text-gray-500 hover:text-black cursor-pointer">save</button>
                    </span>  
                </ul>
                <button className="z-60 h-10 font-semibold hover:border-black px-4 bg-yellow-100 hover:bg-yellow-200 cursor-pointer mt-auto border border-gray-400 transition duration-300 ease-in-out" onClick={onToggle}>Go back to Plants</button>
            </div>
        </div>
    );
};

export default PostNote;
