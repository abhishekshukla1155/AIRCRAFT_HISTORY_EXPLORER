import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAircraftList } from '../services/aircraftService';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';
import { AuthContext } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import AircraftCard from '../components/AircraftCard';

export default function Home() {
  const [aircraftList, setAircraftList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAircraft();
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const fetchAircraft = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAircraftList({ search: query });
      setAircraftList(data);
    } catch (err) {
      console.error("Failed to load aircraft list", err);
      setError("Failed to load aircraft data");
    }
    setLoading(false);
  };

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error("Failed to load favorites", err);
    }
  };

  const handleSearch = (query) => {
    fetchAircraft(query);
  };

  const handleToggleFavorite = async (aircraftId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const existingFav = favorites.find(fav => fav.aircraft === aircraftId);
    if (existingFav) {
      try {
        await removeFavorite(existingFav.id);
        setFavorites(favorites.filter(fav => fav.id !== existingFav.id));
      } catch (err) {
        console.error("Failed to remove favorite", err);
      }
    } else {
      try {
        const newFav = await addFavorite(aircraftId);
        setFavorites([...favorites, newFav]);
      } catch (err) {
        console.error("Failed to add favorite", err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Page Title & Intro */}
      <div className="text-center md:text-left flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-cyan-400 bg-clip-text text-transparent">
          Explore Aviation History
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base font-light leading-relaxed">
          Embark on a journey through flight time. Discover specifications, origins, roles, and engineering milestones of history's most iconic aircraft.
        </p>
      </div>

      {/* Search Bar Wrapper */}
      <div className="w-full max-w-2xl">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onSearch={handleSearch} 
        />
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-mono tracking-wider">Retrieving historical records...</span>
        </div>
      ) : error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 w-full max-w-md mx-auto">
          <span className="text-2xl">⚠️</span>
          <h3 className="font-bold text-rose-400 text-lg">{error}</h3>
          <p className="text-xs text-slate-400">Please check your network connection or backend state and try again.</p>
          <button 
            onClick={() => fetchAircraft(searchQuery)}
            className="mt-2 px-4 py-2 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-all border border-rose-500/30 cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aircraftList.map((aircraft) => (
              <AircraftCard 
                key={aircraft.id} 
                aircraft={aircraft} 
                isFavorite={favorites.some(fav => fav.aircraft === aircraft.id)} 
                onToggleFavorite={handleToggleFavorite} 
              />
            ))}
          </div>
          
          {aircraftList.length === 0 && (
            <div className="text-center py-16 bg-[#0c162d]/35 rounded-2xl border border-slate-800/60">
              <p className="text-slate-500 text-sm">No historical records match your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
