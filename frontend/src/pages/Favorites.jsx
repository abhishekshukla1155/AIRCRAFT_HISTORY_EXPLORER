import React, { useState } from 'react';
import AircraftCard from '../components/AircraftCard';

const MOCK_FAVORITE_AIRCRAFT = [
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
    id: 3,
    name: 'F-22 Raptor',
    manufacturer: 'Lockheed Martin',
    type: 'Fighter',
    era: 'Modern Era',
    introduction_year: 2005,
    status: 'Active',
    thumbnail: null,
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(MOCK_FAVORITE_AIRCRAFT);
  const [comparingIds, setComparingIds] = useState([]);

  const handleFavoriteToggle = (id) => {
    // In actual implementation, this removes the item from favorites list
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const handleCompareToggle = (id) => {
    setComparingIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  if (!favorites) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10 font-sans">
      
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">Personal hangar</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-100 mt-2">My Favorites</h2>
        <p className="text-slate-400 text-sm max-w-xl mt-2">Manage and quickly access your custom collection of historical aircraft.</p>
      </div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((aircraft) => (
            <AircraftCard 
              key={aircraft.id} 
              aircraft={aircraft}
              isFavorited={true}
              isComparing={comparingIds.includes(aircraft.id)}
              onFavoriteToggle={handleFavoriteToggle}
              onCompareToggle={handleCompareToggle}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/10 text-center">
          <svg className="w-12 h-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h4 className="text-slate-200 font-bold text-lg">No Favorites Yet</h4>
          <p className="text-slate-400 text-sm max-w-xs mt-1">Add icon-level heart tags on aircraft cards from the homepage to build your hangar collection.</p>
        </div>
      )}

    </div>
  );
};

export default Favorites;
