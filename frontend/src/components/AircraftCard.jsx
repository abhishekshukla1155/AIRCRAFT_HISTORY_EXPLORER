import React from 'react';
import { Link } from 'react-router-dom';

const AircraftCard = ({ aircraft, onFavoriteToggle, isFavorited, onCompareToggle, isComparing }) => {
  // Gracefully handle empty states with clean placeholders
  const {
    id = 1,
    name = 'Supermarine Spitfire',
    manufacturer = 'Supermarine',
    type = 'Fighter',
    era = 'World War II',
    introduction_year = 1938,
    status = 'Retired',
    thumbnail = null,
  } = aircraft || {};

  return (
    <div className="group relative bg-gradient-to-b from-slate-800/40 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between overflow-hidden">
      
      {/* Decorative colored glow on top hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Aircraft Thumbnail Area */}
      <div className="relative h-48 bg-slate-950/60 overflow-hidden flex items-center justify-center">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 p-4">
            <svg className="w-12 h-12 mb-2 text-slate-600 group-hover:text-cyan-500/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <span className="text-xs uppercase tracking-wider font-semibold">Aircraft Image</span>
          </div>
        )}

        {/* Status Badge */}
        <span className={`absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md backdrop-blur-md border ${
          status.toLowerCase() === 'active' 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          {status}
        </span>

        {/* Era Tag */}
        <span className="absolute bottom-4 left-4 px-2.5 py-1 text-[10px] font-medium text-slate-300 bg-slate-900/80 rounded-md backdrop-blur-sm border border-slate-700/50">
          {era}
        </span>
      </div>

      {/* Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-cyan-400/80 uppercase tracking-widest block mb-1">
            {manufacturer}
          </span>
          <h3 className="font-display text-xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300 mb-2">
            {name}
          </h3>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 py-3 my-3 border-y border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Role</span>
              <span className="font-medium text-slate-200">{type}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Introduced</span>
              <span className="font-medium text-slate-200">{introduction_year}</span>
            </div>
          </div>
        </div>

        {/* Interaction Bar */}
        <div className="flex items-center gap-3 mt-4">
          <Link 
            to={`/aircraft/${id}`}
            className="flex-1 px-4 py-2 text-xs font-semibold text-center text-[#0b1329] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors duration-300 font-sans"
          >
            Explore Timeline
          </Link>

          {/* Compare Toggle Button */}
          <button 
            onClick={() => onCompareToggle && onCompareToggle(id)}
            title={isComparing ? 'Remove from Compare' : 'Add to Compare'}
            className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
              isComparing 
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' 
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          {/* Favorite Toggle Button */}
          <button 
            onClick={() => onFavoriteToggle && onFavoriteToggle(id)}
            title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
              isFavorited 
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
            }`}
          >
            <svg 
              className="w-4 h-4" 
              fill={isFavorited ? 'currentColor' : 'none'} 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default AircraftCard;
