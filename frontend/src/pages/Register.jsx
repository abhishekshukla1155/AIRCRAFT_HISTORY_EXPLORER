import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation for confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({ username, email, password });
      navigate('/login');
    } catch (err) {
      let errMsg = "Registration failed. Please try again.";
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'object') {
          // Flatten dictionary errors from DRF
          errMsg = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
            .join(' | ');
        } else {
          errMsg = data;
        }
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <div className="w-full max-w-[420px] bg-[#0c162d]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-8 shadow-2xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">Create Account</h2>
          <p className="text-xs text-slate-400 mt-1">Register for a new AeroChronicles account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg p-3 flex items-start gap-2.5">
            <span className="text-sm">⚠️</span>
            <span className="break-all">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold text-slate-400 mb-1.5 uppercase tracking-widest">
              Username
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
              className="w-full bg-[#070b18]/60 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
              required 
              disabled={loading}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold text-slate-400 mb-1.5 uppercase tracking-widest">
              Email Address
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              className="w-full bg-[#070b18]/60 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
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
              placeholder="Create password"
              className="w-full bg-[#070b18]/60 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
              required 
              disabled={loading}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold text-slate-400 mb-1.5 uppercase tracking-widest">
              Confirm Password
            </label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Re-type password"
              className="w-full bg-[#070b18]/60 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
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
                Creating account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400 mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline font-semibold">
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
}
