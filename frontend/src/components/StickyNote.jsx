const StickyNote = ({ note}) => {
    <li className="mb-2 items-center border border-gray-400 w-min">
        <span className="bg-pink-200 h-50 w-min flex flex-col items-center justify-top gap-y-5 items-center">
            <span className="bg-pink-300 opacity-40 z-20 h-10 w-50 items-center"><span className="z-40 px-2 opacity-100 rounded-full bg-red-500 ml-22 "></span></span>
            <p>{note.content}</p>
            <p>{note.date_added}</p>
        </span>
    </li>
}
export default StickyNote;