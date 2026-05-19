import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search aircraft by name, manufacturer, type...' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300 pointer-events-none">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3.5 bg-slate-900/60 backdrop-blur-md border border-slate-700/80 focus:border-cyan-500/80 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300 font-sans"
        />

        {/* Action Buttons */}
        <div className="absolute right-3 flex items-center gap-2">
          {query && (
            <button 
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          <button 
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
