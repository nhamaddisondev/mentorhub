import React from "react";
function SearchBtn() {

return (
        <div className="flex flex-col md:flex-row max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-blue-300">
            <input type="text" placeholder="Search by skill, name, or category" className="flex-grow px-4 py-3 outline-none border-none" />
            <button className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 border-l border-blue-300">Search</button>
        </div>
    )
}
export default SearchBtn;