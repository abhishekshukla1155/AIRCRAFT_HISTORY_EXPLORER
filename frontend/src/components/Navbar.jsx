import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import aeroLogo from '../assets/aero-logo.svg';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b1329]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Logo (Left) */}
      <div className="flex items-center">
        <Link to="/" className="group flex items-center gap-3 transition-all duration-300">
          <img 
            src={aeroLogo} 
            alt="AeroChronicles Logo" 
            className="w-10 h-10 group-hover:rotate-6 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-wider text-white group-hover:text-cyan-400 transition-colors duration-300 leading-none">
              AeroChronicles
            </span>
            <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase mt-1 leading-none">
              Aviation History Explorer
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links (Center) */}
      <div className="flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link 
          to="/" 
          className={`hover:text-white transition-all ${isActive('/') ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/compare" 
          className={`hover:text-white transition-all ${isActive('/compare') ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Compare
        </Link>
        <Link 
          to="/timeline" 
          className={`hover:text-white transition-all ${isActive('/timeline') ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Timeline
        </Link>
        {user && (
          <Link 
            to="/favorites" 
            className={`hover:text-white transition-all ${isActive('/favorites') ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Favorites
          </Link>
        )}
      </div>

      {/* Auth Actions (Right) */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50">
              👤 {user.username}
            </span>
            <button 
              onClick={logout} 
              className="px-3.5 py-1.5 rounded-md text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-slate-300 hover:text-white transition-all text-xs font-semibold px-3 py-1.5"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-3.5 py-1.5 rounded-md text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-400/10"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
