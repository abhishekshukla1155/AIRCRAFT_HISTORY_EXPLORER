import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import AircraftCard from '../components/AircraftCard';

const MOCK_AIRCRAFT = [
  {
    id: 1,
    name: 'Supermarine Spitfire',
    manufacturer: 'Supermarine',
    type: 'Fighter',
    era: 'World War II',
    introduction_year: 1938,
    status: 'Retired',
    thumbnail: null,
  },
  {
    id: 2,
    name: 'SR-71 Blackbird',
    manufacturer: 'Lockheed',
    type: 'Reconnaissance',
    era: 'Cold War',
    introduction_year: 1966,
    status: 'Retired',
    thumbnail: null,
  },
  {
    id: 3,
    name: 'F-22 Raptor',
    manufacturer: 'Lockheed Martin',
    type: 'Fighter',
    era: 'Modern Era',
    introduction_year: 2005,
    status: 'Active',
    thumbnail: null,
  },
  {
    id: 4,
    name: 'Boeing 747',
    manufacturer: 'Boeing',
    type: 'Commercial',
    era: 'Cold War',
    introduction_year: 1970,
    status: 'Active',
    thumbnail: null,
  }
];

const Home = () => {
  if (!MOCK_AIRCRAFT) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [comparingIds, setComparingIds] = useState([]);
  const [favoritedIds, setFavoritedIds] = useState([1, 3]); // Some mock favorited IDs

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleFavoriteToggle = (id) => {
    setFavoritedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCompareToggle = (id) => {
    setComparingIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12 font-sans">
      
      {/* Spectacular Hero Banner */}
      <header className="relative py-16 px-8 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800/80 shadow-2xl flex flex-col items-center text-center">
        {/* Abstract background grids/circles */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <span className="px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6 backdrop-blur-md">
          Aviation Archive Database
        </span>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-white mb-6 max-w-4xl leading-tight">
          Journey Through the History of <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Flight</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl font-light leading-relaxed mb-8">
          Explore technical specifications, legendary combat reports, commercial milestones, and key chronological milestones of history's most iconic aircraft.
        </p>

        {/* Global Search Interface */}
        <div className="w-full max-w-2xl relative z-10">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Interactive Filters Panel */}
      <section>
        <FilterPanel onFilterChange={handleFilterChange} />
      </section>

      {/* Grid List of Aircraft */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <h3 className="font-display text-2xl font-bold text-slate-100 flex items-center gap-3">
            Aircraft Fleet
            <span className="text-xs px-2.5 py-1 bg-slate-800 text-cyan-400 rounded-md font-semibold font-mono">
              {MOCK_AIRCRAFT.length} listed
            </span>
          </h3>
          <span className="text-xs text-slate-400">Showing all records</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AIRCRAFT.map((aircraft) => (
            <AircraftCard 
              key={aircraft.id} 
              aircraft={aircraft}
              isFavorited={favoritedIds.includes(aircraft.id)}
              isComparing={comparingIds.includes(aircraft.id)}
              onFavoriteToggle={handleFavoriteToggle}
              onCompareToggle={handleCompareToggle}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
