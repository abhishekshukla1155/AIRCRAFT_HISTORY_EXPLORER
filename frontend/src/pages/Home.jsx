import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAircraftList } from '../services/aircraftService';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';
import { AuthContext } from '../context/AuthContext';
import AircraftCard from '../components/AircraftCard';

export default function Home() {
  const [aircraftList, setAircraftList] = useState([]);
  const [filteredAircraftList, setFilteredAircraftList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedEra, setSelectedEra] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');

  // Dynamic dropdown options
  const [manufacturerOptions, setManufacturerOptions] = useState(['All']);

  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Initial manufacturers collection from all aircraft in db
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const data = await getAircraftList();
        const uniqueManufacturers = ['All', ...new Set(data.map(item => item.manufacturer).filter(Boolean))];
        setManufacturerOptions(uniqueManufacturers);
      } catch (err) {
        console.error("Failed to load manufacturer options", err);
      }
    };
    fetchManufacturers();
  }, []);

  // 2. Fetch favorites if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  // 3. Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // 4. Fetch aircraft when filters change
  useEffect(() => {
    fetchAircraft();
  }, [searchQuery, selectedCountry, selectedEra, selectedRole]);

  // 5. Client-side Manufacturer Filter on the loaded backend dataset
  useEffect(() => {
    let list = [...aircraftList];
    if (selectedManufacturer !== 'All') {
      list = list.filter(item => 
        item.manufacturer.toLowerCase().includes(selectedManufacturer.toLowerCase())
      );
    }
    setFilteredAircraftList(list);
  }, [aircraftList, selectedManufacturer]);

  const fetchAircraft = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchQuery) {
        params.search = searchQuery;
      }
      if (selectedCountry !== 'All') {
        // Map UK to United Kingdom for backend search compatibility
        params.country = selectedCountry === 'UK' ? 'United Kingdom' : selectedCountry;
      }
      if (selectedRole !== 'All') {
        params.role = selectedRole;
      }
      if (selectedEra !== 'All') {
        // Map Era to generation as requested in the API examples
        params.generation = selectedEra;
      }

      const data = await getAircraftList(params);
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

  const handleClearFilters = () => {
    setInputValue('');
    setSelectedManufacturer('All');
    setSelectedCountry('All');
    setSelectedEra('All');
    setSelectedRole('All');
  };

  return (
    <div className="min-h-screen bg-[#081126] text-slate-100 w-full py-4 -mt-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-8">
        
        {/* Page Title & Intro */}
        <div className="text-center md:text-left flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-cyan-400 bg-clip-text text-transparent">
            Explore Aviation History
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base font-light leading-relaxed">
            Embark on a journey through flight time. Discover specifications, origins, roles, and engineering milestones of history's most iconic aircraft.
          </p>
        </div>

        {/* Filter Section */}
        <div className="w-full bg-[#0c162d]/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
            
            {/* Search Input Container */}
            <div className="relative w-full lg:flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search aircraft by name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-full text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
              />
            </div>

            {/* Select Dropdowns Wrapper */}
            <div className="grid grid-cols-2 md:flex md:flex-row gap-3 w-full lg:w-auto">
              
              {/* Manufacturer Filter */}
              <div className="relative w-full md:w-44">
                <select
                  value={selectedManufacturer}
                  onChange={(e) => setSelectedManufacturer(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/85 border border-slate-800 rounded-full text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer appearance-none pr-8"
                >
                  <option value="All">Manufacturer: All</option>
                  {manufacturerOptions.filter(m => m !== 'All').map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-500 text-[9px] pointer-events-none">▼</span>
              </div>

              {/* Country Filter */}
              <div className="relative w-full md:w-36">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/85 border border-slate-800 rounded-full text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer appearance-none pr-8"
                >
                  <option value="All">Country: All</option>
                  <option value="United States">United States</option>
                  <option value="Russia">Russia</option>
                  <option value="France">France</option>
                  <option value="UK">UK</option>
                </select>
                <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-500 text-[9px] pointer-events-none">▼</span>
              </div>

              {/* Era Filter */}
              <div className="relative w-full md:w-36">
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/85 border border-slate-800 rounded-full text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer appearance-none pr-8"
                >
                  <option value="All">Era: All</option>
                  <option value="WWII">WWII</option>
                  <option value="Cold War">Cold War</option>
                  <option value="Jet Age">Jet Age</option>
                  <option value="Modern Era">Modern Era</option>
                </select>
                <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-500 text-[9px] pointer-events-none">▼</span>
              </div>

              {/* Role Filter */}
              <div className="relative w-full md:w-36">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/85 border border-slate-800 rounded-full text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer appearance-none pr-8"
                >
                  <option value="All">Role: All</option>
                  <option value="Fighter">Fighter</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Bomber">Bomber</option>
                  <option value="Experimental">Experimental</option>
                </select>
                <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-500 text-[9px] pointer-events-none">▼</span>
              </div>

            </div>

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="w-full lg:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-xs font-bold transition-all duration-300 border border-slate-750/60 cursor-pointer flex items-center justify-center gap-1.5"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
            <span className="text-xs text-slate-400 font-mono tracking-wider uppercase">Loading matching records...</span>
          </div>
        ) : error ? (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 w-full max-w-md mx-auto">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-bold text-rose-400 text-lg">{error}</h3>
            <p className="text-xs text-slate-400">Please check your network connection or backend state and try again.</p>
            <button 
              onClick={fetchAircraft}
              className="mt-2 px-4 py-2 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-all border border-rose-500/30 cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAircraftList.map((aircraft) => (
                <AircraftCard 
                  key={aircraft.id} 
                  aircraft={aircraft} 
                  isFavorite={favorites.some(fav => fav.aircraft === aircraft.id)} 
                  onToggleFavorite={handleToggleFavorite} 
                />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredAircraftList.length === 0 && (
              <div className="text-center py-20 bg-[#0c162d]/35 rounded-2xl border border-slate-800/60 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cyan-950/30 border border-cyan-500/15 flex items-center justify-center text-3xl shadow-inner text-cyan-400">
                  ✈️
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-200">No aircraft found</h3>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed mx-auto">
                    We couldn't find any historical records matching your criteria. Try adjusting your search query or filters.
                  </p>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="mt-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
