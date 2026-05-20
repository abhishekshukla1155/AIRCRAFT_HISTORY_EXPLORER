import React from 'react';
import { Link } from 'react-router-dom';

export default function AircraftCard({ aircraft, isFavorite, onToggleFavorite }) {
  return (
    <div className="aircraft-card">
      <div className="aircraft-header">
        <h3>{aircraft.name}</h3>
        <button 
          onClick={() => onToggleFavorite(aircraft.id)}
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="aircraft-body">
        <p><strong>Manufacturer:</strong> {aircraft.manufacturer}</p>
        <p><strong>Country:</strong> {aircraft.country}</p>
        <p><strong>Role:</strong> {aircraft.role}</p>
        <p><strong>Generation:</strong> {aircraft.generation}</p>
      </div>
    </div>
  );
}
