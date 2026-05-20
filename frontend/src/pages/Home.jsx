import React, { useState, useEffect } from 'react';
import { getAircraftList } from '../services/aircraftService';
import SearchBar from '../components/SearchBar';
import AircraftCard from '../components/AircraftCard';

export default function Home() {
  const [aircraftList, setAircraftList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAircraft();
  }, []);

  const fetchAircraft = async (query = '') => {
    setLoading(true);
    try {
      const data = await getAircraftList({ search: query });
      setAircraftList(data);
    } catch (error) {
      console.error("Failed to load aircraft list", error);
    }
    setLoading(false);
  };

  const handleSearch = (query) => {
    fetchAircraft(query);
  };

  return (
    <div className="page home-page">
      <h1>Explore Aircraft History</h1>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSearch={handleSearch} 
      />
      {loading ? (
        <p>Loading aircraft list...</p>
      ) : (
        <div className="aircraft-grid">
          {aircraftList.map((aircraft) => (
            <AircraftCard 
              key={aircraft.id} 
              aircraft={aircraft} 
              onToggleFavorite={() => {}} 
            />
          ))}
          {aircraftList.length === 0 && <p>No aircraft found matching your query.</p>}
        </div>
      )}
    </div>
  );
}
