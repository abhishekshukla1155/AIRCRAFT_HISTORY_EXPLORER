import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTimeline } from '../services/aircraftService';

// Custom Scroll Reveal Component using IntersectionObserver
function ScrollReveal({ children, className = '' }) {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Keep observation if we want repeat, but once is cleaner and faster
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px', // triggers slightly before entering
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Timeline() {
  const [timelineData, setTimelineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedEra, setSelectedEra] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');

  // Available filter options dynamically populated from the dataset
  const [eraOptions, setEraOptions] = useState(['All']);
  const [countryOptions, setCountryOptions] = useState(['All']);
  const [manufacturerOptions, setManufacturerOptions] = useState(['All']);
  const [roleOptions, setRoleOptions] = useState(['All']);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTimeline();
      setTimelineData(data);
      setFilteredData(data);
      
      // Dynamically extract unique options for filters
      const eras = ['All', ...new Set(data.map(item => item.era).filter(Boolean))];
      const countries = ['All', ...new Set(data.map(item => item.country).filter(Boolean))];
      const manufacturers = ['All', ...new Set(data.map(item => item.manufacturer).filter(Boolean))];
      
      // Simplify roles to prevent having too many unique granular strings
      const roles = ['All', ...new Set(data.map(item => {
        // Group similar roles together for a cleaner pill UI
        const r = item.role.toLowerCase();
        if (r.includes('fighter')) return 'Fighter';
        if (r.includes('airliner')) return 'Airliner';
        if (r.includes('reconnaissance')) return 'Reconnaissance';
        if (r.includes('experimental')) return 'Experimental';
        return item.role;
      }).filter(Boolean))];

      setEraOptions(eras);
      setCountryOptions(countries);
      setManufacturerOptions(manufacturers);
      setRoleOptions(roles);
    } catch (err) {
      console.error('Failed to load timeline records', err);
      setError('Could not retrieve timeline data. Please ensure the backend is running.');
    }
    setLoading(false);
  };

  // Perform filtering instantly whenever filter states change
  useEffect(() => {
    let filtered = [...timelineData];

    if (selectedEra !== 'All') {
      filtered = filtered.filter(item => item.era === selectedEra);
    }
    if (selectedCountry !== 'All') {
      filtered = filtered.filter(item => item.country === selectedCountry);
    }
    if (selectedManufacturer !== 'All') {
      filtered = filtered.filter(item => item.manufacturer === selectedManufacturer);
    }
    if (selectedRole !== 'All') {
      filtered = filtered.filter(item => {
        const r = item.role.toLowerCase();
        const sel = selectedRole.toLowerCase();
        if (sel === 'fighter') return r.includes('fighter');
        if (sel === 'airliner') return r.includes('airliner');
        if (sel === 'reconnaissance') return r.includes('reconnaissance');
        if (sel === 'experimental') return r.includes('experimental');
        return r === sel;
      });
    }

    setFilteredData(filtered);
  }, [selectedEra, selectedCountry, selectedManufacturer, selectedRole, timelineData]);

  const resetFilters = () => {
    setSelectedEra('All');
    setSelectedCountry('All');
    setSelectedManufacturer('All');
    setSelectedRole('All');
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800';
    if (imagePath.startsWith('http')) return imagePath;
    return `${import.meta.env.VITE_API_URL}${imagePath}`;
  };

  return (
    <div className="relative min-h-screen bg-[#081126] text-slate-100 overflow-x-hidden w-full pb-20">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-[#081126] to-[#081126] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            Aircraft Evolution Timeline
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
            Explore the journey of aviation through history
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mt-2 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </div>

        {/* Filters Section */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-sm font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-2">
              <span>🎛️</span> Filters
            </span>
            {(selectedEra !== 'All' || selectedCountry !== 'All' || selectedManufacturer !== 'All' || selectedRole !== 'All') && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Era Filter */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-slate-400">Era</span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {eraOptions.map(era => (
                  <button
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      selectedEra === era
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-slate-400">Country</span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {countryOptions.map(country => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      selectedCountry === country
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            {/* Manufacturer Filter */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-slate-400">Manufacturer</span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {manufacturerOptions.map(man => (
                  <button
                    key={man}
                    onClick={() => setSelectedManufacturer(man)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      selectedManufacturer === man
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {man === 'All' ? 'All' : man.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Filter */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-slate-400">Role</span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {roleOptions.map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      selectedRole === role
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
            <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">Initializing Timeline...</span>
          </div>
        ) : error ? (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 w-full max-w-md mx-auto">
            <span className="text-4xl">⚠️</span>
            <h3 className="font-bold text-rose-400 text-lg">{error}</h3>
            <button 
              onClick={fetchTimeline}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-all border border-rose-500/30 cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <div className="relative w-full">
            {/* Centered timeline vertical spine (Desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-cyan-500/10 via-cyan-500/40 to-cyan-500/10" />

            {/* Left timeline vertical spine (Mobile) */}
            <div className="block md:hidden absolute left-4 w-[2px] h-full bg-gradient-to-b from-cyan-500/10 via-cyan-500/40 to-cyan-500/10" />

            {/* Timeline Events list */}
            <div className="flex flex-col gap-12 md:gap-16 relative">
              {filteredData.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <ScrollReveal key={item.id} className="w-full">
                    {/* Event wrapper */}
                    {/* Desktop layout: Col 1 (left item), Col 2 (spine node), Col 3 (right item) */}
                    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full gap-8">
                      
                      {/* Left Side Content */}
                      <div className={`flex flex-col ${isEven ? 'items-end text-right' : 'items-start opacity-0 pointer-events-none'}`}>
                        {isEven && (
                          <div className="flex items-center gap-4 w-full justify-end">
                            <TimelineCard item={item} />
                            {/* Horizontal connector line */}
                            <div className="w-8 border-t-2 border-dashed border-cyan-500/30 flex-shrink-0" />
                          </div>
                        )}
                      </div>

                      {/* Timeline Center Indicator */}
                      <div className="relative flex flex-col items-center justify-center w-16 h-full z-10">
                        {/* Year Badge */}
                        <div className="absolute -top-7 text-xs font-bold tracking-wider text-cyan-400 bg-slate-900 border border-cyan-500/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                          {item.year}
                        </div>
                        {/* Pulse Glowing Node */}
                        <div className="w-5 h-5 rounded-full bg-cyan-400 border-4 border-slate-950 flex items-center justify-center shadow-[0_0_15px_#06b6d4] relative group-hover:scale-125 transition-transform duration-300">
                          <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                        </div>
                      </div>

                      {/* Right Side Content */}
                      <div className={`flex flex-col ${!isEven ? 'items-start text-left' : 'items-end opacity-0 pointer-events-none'}`}>
                        {!isEven && (
                          <div className="flex items-center gap-4 w-full justify-start">
                            {/* Horizontal connector line */}
                            <div className="w-8 border-t-2 border-dashed border-cyan-500/30 flex-shrink-0" />
                            <TimelineCard item={item} />
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Mobile layout: stacked timeline */}
                    <div className="md:hidden flex w-full gap-4 pl-0">
                      
                      {/* Node Indicator left */}
                      <div className="flex flex-col items-center w-8 flex-shrink-0 relative">
                        <div className="w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950 shadow-[0_0_12px_#06b6d4] mt-6 z-10 relative">
                          <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-60" />
                        </div>
                      </div>

                      {/* Card Content right */}
                      <div className="flex-1 flex flex-col gap-2 pb-2">
                        {/* Mobile Year Badge */}
                        <div className="inline-block self-start text-xs font-black tracking-wider text-cyan-400 bg-slate-900 border border-cyan-500/30 px-2.5 py-0.5 rounded-md shadow-md">
                          {item.year}
                        </div>
                        <TimelineCard item={item} />
                      </div>

                    </div>
                  </ScrollReveal>
                );
              })}

              {filteredData.length === 0 && (
                <div className="text-center py-20 bg-slate-900/20 border border-slate-800/40 rounded-3xl backdrop-blur-sm max-w-lg mx-auto w-full">
                  <span className="text-3xl">🔍</span>
                  <p className="text-slate-400 text-sm mt-3 font-light">No historical records match your filter criteria.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/25 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Inner Timeline Card Component
function TimelineCard({ item }) {
  return (
    <div className="w-full max-w-md group flex flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/60 hover:bg-slate-900/90 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Card Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950 border-b border-slate-850">
        <img 
          src={item.image ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`) : 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800'} 
          alt={item.name} 
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Floating Era Badge */}
        <span className="absolute bottom-3 right-3 text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500 text-slate-950 px-2.5 py-1 rounded-md shadow-md shadow-cyan-500/10">
          {item.era}
        </span>
      </div>

      {/* Card Details */}
      <div className="flex-1 flex flex-col p-5 gap-3.5 text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/90 block">
            {item.manufacturer}
          </span>
          <h3 className="font-extrabold text-lg text-slate-100 mt-1 leading-tight group-hover:text-cyan-300 transition-colors duration-200">
            {item.name}
          </h3>
        </div>

        {/* Specs summary */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-[#091022]/60 p-3 rounded-xl border border-slate-800/60">
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium">Role</span>
            <span className="text-slate-200 font-semibold mt-0.5 truncate">{item.role}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium">Country</span>
            <span className="text-slate-200 font-semibold mt-0.5 truncate">{item.country}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
          {item.description}
        </p>

        {/* Action Link */}
        <Link 
          to={`/aircraft/${item.id}`}
          className="mt-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors self-start"
        >
          View Full Specifications <span>➔</span>
        </Link>
      </div>

    </div>
  );
}
