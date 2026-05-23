import React, { useState, useEffect } from 'react';
import { getAircraftList } from '../services/aircraftService';

const AircraftCompareCard = ({ aircraft, slotNumber }) => {
  if (!aircraft) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-2xl border-2 border-dashed border-slate-800/80 bg-[#0c162d]/25 text-slate-500 p-6 text-center">
        <span className="text-3xl mb-3">✈️</span>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Aircraft {slotNumber}</p>
        <p className="text-[10px] text-slate-600 mt-1">Select from the dropdown above to compare specs</p>
      </div>
    );
  }

  const imageUrl = aircraft.image ? (aircraft.image.startsWith('http') ? aircraft.image : `${import.meta.env.VITE_API_URL}${aircraft.image}`) : 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-[#0c162d]/60 overflow-hidden shadow-lg hover:border-slate-700/60 transition-colors duration-300">
      <div className="h-40 w-full overflow-hidden bg-slate-950">
        <img 
          src={imageUrl} 
          alt={aircraft.name} 
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
            {aircraft.manufacturer}
          </span>
          <h3 className="font-bold text-base text-slate-100 mt-0.5 leading-tight">
            {aircraft.name}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2.5 text-xs bg-[#090f20]/45 p-3 rounded-lg border border-slate-800/40">
          <div>
            <span className="text-slate-500 font-medium">Country</span>
            <span className="text-slate-300 font-semibold block truncate mt-0.5">{aircraft.country}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Role</span>
            <span className="text-slate-300 font-semibold block truncate mt-0.5">{aircraft.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Title section */}
      <div className="text-center md:text-left flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-cyan-400 bg-clip-text text-transparent">
          Aircraft Comparison Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl text-xs md:text-sm font-light leading-relaxed">
          Select two military or historical aircraft from the fleets to analyze specifications, design, roles, and generations side-by-side.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0c162d]/45 p-6 rounded-2xl border border-slate-800/80">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Select Aircraft 1:
          </label>
          <select 
            onChange={(e) => handleSelect(0, e.target.value)}
            className="w-full bg-[#070b18]/70 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
          >
            <option value="">Choose an aircraft...</option>
            {aircraftList.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Select Aircraft 2:
          </label>
          <select 
            onChange={(e) => handleSelect(1, e.target.value)}
            className="w-full bg-[#070b18]/70 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
          >
            <option value="">Choose an aircraft...</option>
            {aircraftList.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center my-4">
        <div className="md:col-span-3">
          <AircraftCompareCard aircraft={selectedAircraft[0]} slotNumber={1} />
        </div>
        
        <div className="md:col-span-1 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-extrabold text-sm shadow-md shadow-cyan-400/10">
            VS
          </div>
        </div>

        <div className="md:col-span-3">
          <AircraftCompareCard aircraft={selectedAircraft[1]} slotNumber={2} />
        </div>
      </div>

      {/* Specifications Table */}
      <div className="w-full bg-[#0c162d]/45 rounded-2xl border border-slate-800/80 overflow-hidden mt-4">
        {selectedAircraft[0] || selectedAircraft[1] ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#070b18]/45">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/3">Specification</th>
                  <th className="p-4 text-sm font-bold text-cyan-400 w-1/3">{selectedAircraft[0]?.name || 'Not Selected'}</th>
                  <th className="p-4 text-sm font-bold text-cyan-400 w-1/3">{selectedAircraft[1]?.name || 'Not Selected'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs md:text-sm text-slate-300">
                <tr className="hover:bg-slate-800/10 transition-colors">
                  <td className="p-4 font-bold text-slate-400">Name</td>
                  <td className="p-4 font-semibold text-slate-200">{selectedAircraft[0]?.name || '-'}</td>
                  <td className="p-4 font-semibold text-slate-200">{selectedAircraft[1]?.name || '-'}</td>
                </tr>
                <tr className="hover:bg-slate-800/10 transition-colors">
                  <td className="p-4 font-bold text-slate-400">Manufacturer</td>
                  <td className="p-4">{selectedAircraft[0]?.manufacturer || '-'}</td>
                  <td className="p-4">{selectedAircraft[1]?.manufacturer || '-'}</td>
                </tr>
                <tr className="hover:bg-slate-800/10 transition-colors">
                  <td className="p-4 font-bold text-slate-400">Country</td>
                  <td className="p-4">{selectedAircraft[0]?.country || '-'}</td>
                  <td className="p-4">{selectedAircraft[1]?.country || '-'}</td>
                </tr>
                <tr className="hover:bg-slate-800/10 transition-colors">
                  <td className="p-4 font-bold text-slate-400">Role</td>
                  <td className="p-4">{selectedAircraft[0]?.role || '-'}</td>
                  <td className="p-4">{selectedAircraft[1]?.role || '-'}</td>
                </tr>
                <tr className="hover:bg-slate-800/10 transition-colors">
                  <td className="p-4 font-bold text-slate-400">Generation</td>
                  <td className="p-4">{selectedAircraft[0]?.generation || '-'}</td>
                  <td className="p-4">{selectedAircraft[1]?.generation || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            Please select at least one aircraft from the dropdown selectors to display the side-by-side specifications.
          </div>
        )}
      </div>
    </div>
  );
}
