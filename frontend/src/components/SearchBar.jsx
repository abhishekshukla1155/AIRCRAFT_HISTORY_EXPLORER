import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <form className="relative flex items-center w-full bg-[#0c162d]/65 rounded-xl border border-slate-800 focus-within:border-cyan-400/50 focus-within:shadow-lg focus-within:shadow-cyan-400/5 transition-all duration-300 overflow-hidden" onSubmit={handleSubmit}>
      {/* Search Icon */}
      <div className="absolute left-4 pointer-events-none text-slate-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Search aircraft by name, manufacturer, country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent pl-12 pr-28 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
      />

      {/* Submit Button */}
      <button 
        type="submit" 
        className="absolute right-2 px-5 py-2 rounded-lg text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
