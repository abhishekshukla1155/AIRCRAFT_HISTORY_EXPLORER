import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1329]/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-extrabold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400 m-0">
              AERO<span className="font-light text-cyan-400">CHRONICLES</span>
            </h1>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold -mt-1 font-sans">
              Aircraft History Explorer
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition-colors duration-300 hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-slate-300'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/compare" 
            className={({ isActive }) => 
              `transition-colors duration-300 hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-slate-300'}`
            }
          >
            Compare
          </NavLink>
          {isAuthenticated && (
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => 
                `transition-colors duration-300 hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-slate-300'}`
              }
            >
              Favorites
            </NavLink>
          )}
        </div>

        {/* Profile / Auth Controls */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-slate-200">{user?.username}</span>
                <span className="text-xs text-slate-400">Aviator</span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-red-500/10 hover:text-red-400 border border-slate-700/80 hover:border-red-500/30 rounded-lg transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300"
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 text-xs font-bold text-[#0b1329] bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-lg shadow-lg shadow-cyan-500/15 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
