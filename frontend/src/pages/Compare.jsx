import React, { useState, useEffect } from 'react';
import { getAircraftList } from '../services/aircraftService';

export default function Compare() {
  const [aircraftList, setAircraftList] = useState([]);
  const [selectedAircraft, setSelectedAircraft] = useState([null, null]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getAircraftList();
        setAircraftList(data);
      } catch (error) {
        console.error("Failed to fetch aircraft list for comparison", error);
      }
    };
    fetchList();
  }, []);

  const handleSelect = (index, id) => {
    const aircraft = aircraftList.find(a => a.id === parseInt(id));
    const newSelection = [...selectedAircraft];
    newSelection[index] = aircraft || null;
    setSelectedAircraft(newSelection);
  };

  return (
    <div className="page compare-page">
      <h2>Compare Aircrafts</h2>
      <div className="comparison-selectors">
        <div className="selector-group">
          <label>Aircraft 1:</label>
          <select onChange={(e) => handleSelect(0, e.target.value)}>
            <option value="">Select an aircraft...</option>
            {aircraftList.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div className="selector-group">
          <label>Aircraft 2:</label>
          <select onChange={(e) => handleSelect(1, e.target.value)}>
            <option value="">Select an aircraft...</option>
            {aircraftList.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      </div>

      <div className="comparison-table-container">
        {selectedAircraft[0] || selectedAircraft[1] ? (
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>{selectedAircraft[0]?.name || 'N/A'}</th>
                <th>{selectedAircraft[1]?.name || 'N/A'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Manufacturer</strong></td>
                <td>{selectedAircraft[0]?.manufacturer || '-'}</td>
                <td>{selectedAircraft[1]?.manufacturer || '-'}</td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>{selectedAircraft[0]?.country || '-'}</td>
                <td>{selectedAircraft[1]?.country || '-'}</td>
              </tr>
              <tr>
                <td><strong>Role</strong></td>
                <td>{selectedAircraft[0]?.role || '-'}</td>
                <td>{selectedAircraft[1]?.role || '-'}</td>
              </tr>
              <tr>
                <td><strong>Generation</strong></td>
                <td>{selectedAircraft[0]?.generation || '-'}</td>
                <td>{selectedAircraft[1]?.generation || '-'}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Please select aircraft to compare specifications side-by-side.</p>
        )}
      </div>
    </div>
  );
}
