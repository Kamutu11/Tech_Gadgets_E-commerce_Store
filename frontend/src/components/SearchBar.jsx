import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [q, setQ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search gadgets..."
        className="w-full p-2 border border-gray-300 rounded-l"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
