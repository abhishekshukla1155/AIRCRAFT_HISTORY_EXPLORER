import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">✈️ Aircraft History Explorer</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/compare">Compare</Link>
        {user ? (
          <>
            <Link to="/favorites">Favorites</Link>
            <span className="navbar-user">Hello, {user.username}</span>
            <button onClick={logout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
