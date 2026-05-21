import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <div className="w-full max-w-[420px] bg-[#0c162d]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-8 shadow-2xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to your AeroChronicles account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg p-3 flex items-start gap-2.5">
            <span className="text-sm">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold text-slate-400 mb-1.5 uppercase tracking-widest">
              Username
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
              className="w-full bg-[#070b18]/60 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
              required 
              disabled={loading}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold text-slate-400 mb-1.5 uppercase tracking-widest">
              Password
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              className="w-full bg-[#070b18]/60 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
              required 
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-2 rounded-lg text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-400/10"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400 mt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 hover:underline font-semibold">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
