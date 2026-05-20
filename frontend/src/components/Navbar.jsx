import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b1329]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Logo (Left) */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-extrabold tracking-wider text-white hover:text-cyan-400 transition-all flex items-center gap-2">
          <span>✈️</span> AeroChronicles
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
