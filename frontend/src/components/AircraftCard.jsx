import React from 'react';
import { Link } from 'react-router-dom';

export default function AircraftCard({ aircraft, isFavorite, onToggleFavorite }) {
  const imageUrl = aircraft.image 
    ? (aircraft.image.startsWith('http') ? aircraft.image : `http://127.0.0.1:8000${aircraft.image}`)
    : 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0c162d]/60 hover:bg-[#0e1b38]/80 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300">
      {/* Aircraft Image and Overlay Actions */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img 
          src={imageUrl} 
          alt={aircraft.name} 
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Favorite Button (Top-Right Overlay) */}
        <button 
          onClick={() => onToggleFavorite(aircraft.id)}
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-slate-950/60 border border-slate-700/50 hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className="text-lg leading-none">
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-5 gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400/90">
            {aircraft.manufacturer}
          </span>
          <h3 className="font-bold text-lg text-slate-100 mt-1 leading-tight group-hover:text-cyan-400 transition-colors duration-200">
            {aircraft.name}
          </h3>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-[#090f20]/50 p-3 rounded-lg border border-slate-800/40">
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium">Country</span>
            <span className="text-slate-300 font-semibold mt-0.5 truncate">{aircraft.country}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium">Role</span>
            <span className="text-slate-300 font-semibold mt-0.5 truncate">{aircraft.role}</span>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-slate-500 font-medium">Generation</span>
            <span className="text-slate-300 font-semibold mt-0.5">
              {aircraft.generation || 'N/A'}
            </span>
          </div>
        </div>

        {/* Explore Timeline Action */}
        <Link 
          to={`/aircraft/${aircraft.id}`}
          className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-bold bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 transition-all shadow-sm border border-slate-700/50"
        >
          Explore Timeline <span>➔</span>
        </Link>
      </div>
    </div>
  );
}
