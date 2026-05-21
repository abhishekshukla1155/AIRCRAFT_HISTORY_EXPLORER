import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, removeFavorite } from '../services/favoriteService';
import { getAircraftList } from '../services/aircraftService';
import AircraftCard from '../components/AircraftCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const [favData, aircraftData] = await Promise.all([
        getFavorites(),
        getAircraftList()
      ]);

      const favoritedAircraft = favData.map(fav => {
        const fullAircraft = aircraftData.find(a => a.id === fav.aircraft);
        return {
          favoriteId: fav.id,
          ...fullAircraft,
          id: fav.aircraft,
          name: fav.aircraft_name || (fullAircraft && fullAircraft.name),
          manufacturer: fav.manufacturer || (fullAircraft && fullAircraft.manufacturer),
          country: fav.country || (fullAircraft && fullAircraft.country),
          generation: fav.generation || (fullAircraft && fullAircraft.generation),
        };
      }).filter(Boolean);

      setFavorites(favoritedAircraft);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    }
    setLoading(false);
  };

  const handleRemove = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites(favorites.filter(fav => fav.favoriteId !== favoriteId));
    } catch (error) {
      console.error("Failed to remove favorite", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#081126] text-slate-100 py-8 px-4 md:px-8 flex flex-col gap-8 rounded-3xl">
      {/* Title & Intro */}
      <div className="text-center md:text-left flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-cyan-400 bg-clip-text text-transparent">
          My Favorite Fleet
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base font-light leading-relaxed">
          Your bookmarked collection of history's most extraordinary flying machines. Keep track of their milestones and records.
        </p>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-mono tracking-wider">Loading your fleet...</span>
        </div>
      ) : favorites.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center gap-6 bg-slate-900/40 border border-cyan-500/10 rounded-3xl p-8 max-w-lg mx-auto">
          <span className="text-5xl animate-pulse">✈️</span>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-300">No favorite aircraft yet</h3>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Explore our aviation chronicles, read about breakthrough eras, and bookmark aircraft to compile your personalized hangar.
            </p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 transition-all duration-300 shadow-md shadow-cyan-500/20 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Explore Aircraft
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((fav) => (
            <div 
              key={fav.favoriteId} 
              className="flex flex-col bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-4 hover:border-cyan-500/40 transition duration-300"
            >
              <AircraftCard 
                aircraft={fav} 
                isFavorite={true} 
                onToggleFavorite={() => handleRemove(fav.favoriteId)} 
              />
              <button 
                onClick={() => handleRemove(fav.favoriteId)}
                className="mt-4 w-full rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition py-3 font-medium"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

