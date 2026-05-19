import React, { useState } from 'react';

const FilterPanel = ({ onFilterChange, eras = [], manufacturers = [], types = [], statuses = [] }) => {
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        era: selectedEra,
        manufacturer: selectedManufacturer,
        type: selectedType,
        status: selectedStatus,
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedEra('');
    setSelectedManufacturer('');
    setSelectedType('');
    setSelectedStatus('');
    if (onFilterChange) {
      onFilterChange({
        era: '',
        manufacturer: '',
        type: '',
        status: '',
      });
    }
  };

  // Modern defaults for static representation
  const defaultEras = eras.length ? eras : ['World War I', 'World War II', 'Cold War', 'Modern Era'];
  const defaultManufacturers = manufacturers.length ? manufacturers : ['Boeing', 'Lockheed Martin', 'Supermarine', 'Messerschmitt', 'North American'];
  const defaultTypes = types.length ? types : ['Fighter', 'Bomber', 'Commercial', 'Cargo', 'Reconnaissance'];
  const defaultStatuses = statuses.length ? statuses : ['Active', 'Retired'];

  return (
    <div className="bg-[#0b1329]/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 shadow-xl flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <h4 className="font-display font-bold text-slate-200 tracking-wide flex items-center gap-2">
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Refine History
        </h4>
        <button 
          onClick={handleResetFilters}
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors duration-300 cursor-pointer"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans">
        
        {/* Era Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Historical Era</label>
          <select 
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80"
          >
            <option value="">All Eras</option>
            {defaultEras.map((era) => (
              <option key={era} value={era}>{era}</option>
            ))}
          </select>
        </div>

        {/* Manufacturer Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Manufacturer</label>
          <select 
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80"
          >
            <option value="">All Manufacturers</option>
            {defaultManufacturers.map((mfg) => (
              <option key={mfg} value={mfg}>{mfg}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Aircraft Type</label>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80"
          >
            <option value="">All Types</option>
            {defaultTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Operational Status</label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80"
          >
            <option value="">All Statuses</option>
            {defaultStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="flex justify-end mt-2">
        <button 
          onClick={handleApplyFilters}
          className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
