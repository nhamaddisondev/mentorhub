import React from "react";

function SearchBtn({ onSearch, searchTerm, onSearchTermChange }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-blue-300">
      <input 
        type="text" 
        placeholder="Search by skill, name, or category" 
        className="flex-grow px-4 py-3 outline-none border-none" 
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button 
        className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 border-l border-blue-300"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBtn;