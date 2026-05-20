import React from 'react';

const MOCK_COMPARISON_DATA = [
  {
    id: 1,
    name: 'Supermarine Spitfire',
    manufacturer: 'Supermarine',
    type: 'Fighter',
    era: 'World War II',
    introduction_year: 1938,
    status: 'Retired',
    max_speed: '370 mph (595 km/h)',
    range: '470 mi (756 km)',
    engine: 'Rolls-Royce Merlin V12',
    wingspan: '36 ft 10 in (11.23 m)',
    weight: '5,061 lb (2,296 kg)',
  },
  {
    id: 2,
    name: 'SR-71 Blackbird',
    manufacturer: 'Lockheed',
    type: 'Reconnaissance',
    era: 'Cold War',
    introduction_year: 1966,
    status: 'Retired',
    max_speed: '2,200 mph (3,540 km/h)',
    range: '3,200 mi (5,400 km)',
    engine: 'Pratt & Whitney J58 turbojet',
    wingspan: '55 ft 7 in (16.94 m)',
    weight: '67,500 lb (30,600 kg)',
  }
];

const Compare = () => {
  if (!MOCK_COMPARISON_DATA) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10 font-sans">
      
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">specifications matrix</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-100 mt-2">Compare Aircraft</h2>
        <p className="text-slate-400 text-sm max-w-xl mt-2">Analyze technical dimensions, power plants, performance capabilities, and operational contexts side-by-side.</p>
      </div>

      {/* Comparison Grid */}
      {MOCK_COMPARISON_DATA.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-700/50 bg-[#0b1329]/40 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/40">
                <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-widest w-1/4">Specs</th>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <th key={item.id} className="p-6 w-1/3">
                    <span className="text-[10px] font-semibold text-cyan-400/80 uppercase block mb-1">{item.manufacturer}</span>
                    <span className="font-display font-bold text-lg text-slate-100 block">{item.name}</span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-sm divide-y divide-slate-800/60 font-sans text-slate-300">
              
              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Era</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6">{item.era}</td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Type</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6">{item.type}</td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Introduced</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6">{item.introduction_year}</td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Status</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      item.status.toLowerCase() === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Max Speed</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6 font-mono text-slate-200">{item.max_speed}</td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Range</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6 font-mono text-slate-200">{item.range}</td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Engine</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6">{item.engine}</td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Wingspan</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6 font-mono text-slate-200">{item.wingspan}</td>
                ))}
              </tr>

              <tr>
                <td className="p-6 font-semibold text-slate-400 uppercase tracking-wider text-xs bg-slate-900/10">Weight</td>
                {MOCK_COMPARISON_DATA.map((item) => (
                  <td key={item.id} className="p-6 font-mono text-slate-200">{item.weight}</td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/10 text-center">
          <svg className="w-12 h-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h4 className="text-slate-200 font-bold text-lg">No Selected Aircraft</h4>
          <p className="text-slate-400 text-sm max-w-xs mt-1">Go back to the homepage to select aircraft cards to start comparing specs.</p>
        </div>
      )}

    </div>
  );
};

export default Compare;
