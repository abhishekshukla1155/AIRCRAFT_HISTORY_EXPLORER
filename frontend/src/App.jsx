import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import AircraftDetails from './pages/AircraftDetails';

// Simple ProtectedRoute component for authenticated views (like Favorites)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1329]">
        <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col font-sans antialiased">
          
          {/* Global Sticky Navigation Header */}
          <Navbar />

          {/* Main App Content Viewport */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/aircraft/:id" element={<AircraftDetails />} />

              {/* Protected Routes */}
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback Catch-All Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-900/60 bg-[#070b18]/60 py-6 text-center text-xs text-slate-500 font-sans tracking-wide">
            <div>
              &copy; {new Date().getFullYear()} AeroChronicles. All historical rights and archives reserved.
            </div>
          </footer>

        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
