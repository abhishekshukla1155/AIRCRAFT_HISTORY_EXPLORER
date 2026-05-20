import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ username, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="page register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="error-message">
            {typeof error === 'object' ? JSON.stringify(error) : error}
          </div>
        )}
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="auth-btn">Register</button>
      </form>
    </div>
  );
}
