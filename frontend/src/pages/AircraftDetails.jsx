import React from 'react';
import { useParams, Link } from 'react-router-dom';

const MOCK_AIRCRAFT_DETAILS = {
  id: 1,
  name: 'Supermarine Spitfire',
  manufacturer: 'Supermarine',
  type: 'Fighter',
  era: 'World War II',
  introduction_year: 1938,
  status: 'Retired',
  description: 'The Supermarine Spitfire is a British single-seat fighter aircraft that was used by the Royal Air Force and other Allied countries before, during, and after World War II. It was designed as a short-range, high-performance interceptor aircraft by R. J. Mitchell.',
  specifications: {
    wingspan: '36 ft 10 in (11.23 m)',
    length: '29 ft 11 in (9.12 m)',
    max_speed: '370 mph (595 km/h)',
    range: '470 mi (756 km)',
    engine: 'Rolls-Royce Merlin V12 (1,470 hp)',
    ceiling: '36,500 ft (11,125 m)',
    weight: '5,061 lb (2,296 kg)',
  },
  timeline: [
    { id: 101, year: 1934, title: 'Initial Prototype Design', description: 'Designer R. J. Mitchell starts developing the Type 300 prototype to fulfill RAF interceptor specifications.' },
    { id: 102, year: 1936, title: 'Maiden Flight', description: 'The prototype Spitfire K5054 takes to the air for the first time at Eastleigh Aerodrome on March 5.' },
    { id: 103, year: 1938, title: 'Squadron Induction', description: 'RAF No. 19 Squadron receives its first production Spitfire Mk I, beginning an legendary era of combat service.' },
    { id: 104, year: 1940, title: 'Battle of Britain', description: 'Spitfires work in unison with Hawker Hurricanes to defend the United Kingdom against the German Luftwaffe.' },
    { id: 105, year: 1948, title: 'Post-War Retirement', description: 'Spitfire operations transition to secondary roles and target towing before official retirement from front-line RAF squadrons.' }
  ]
};

const AircraftDetails = () => {
  const { id } = useParams();

  // For this foundation phase, use the pre-populated mock details
  const aircraft = MOCK_AIRCRAFT_DETAILS;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12 font-sans text-slate-300">
      
      {/* Back Button */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Fleet
        </Link>
      </div>

      {/* Hero Overview Header */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Detail Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">{aircraft.manufacturer}</span>
            <h2 className="font-display font-extrabold text-4xl text-slate-100 mt-2">{aircraft.name}</h2>
            <div className="flex gap-3 mt-4 text-xs font-medium">
              <span className="px-3 py-1 bg-slate-800 border border-slate-700/80 rounded-md">{aircraft.type}</span>
              <span className="px-3 py-1 bg-slate-800 border border-slate-700/80 rounded-md">{aircraft.era}</span>
              <span className={`px-3 py-1 rounded-md border ${
                aircraft.status.toLowerCase() === 'active' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>{aircraft.status}</span>
            </div>
          </div>

          <p className="text-slate-400 font-light leading-relaxed text-base">{aircraft.description}</p>
        </div>

        {/* Technical Specification Box */}
        <div className="bg-[#0b1329]/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 shadow-xl flex flex-col gap-4">
          <h4 className="font-display font-bold text-slate-200 border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Technical Specifications
          </h4>

          <div className="flex flex-col gap-3.5 text-xs">
            {Object.entries(aircraft.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1.5 border-b border-slate-800/40 last:border-0">
                <span className="text-slate-400 capitalize font-medium">{key.replace('_', ' ')}</span>
                <span className="text-slate-200 font-semibold font-mono text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Historical Timeline Section */}
      <section className="flex flex-col gap-8">
        <h3 className="font-display text-2xl font-bold text-slate-100 border-b border-slate-800/80 pb-4 flex items-center gap-3">
          Chronological Development & Service Timeline
          <span className="text-xs px-2.5 py-1 bg-slate-800 text-cyan-400 rounded-md font-semibold font-mono">
            {aircraft.timeline.length} Milestones
          </span>
        </h3>

        {/* Timeline Component Layout */}
        <div className="relative pl-6 md:pl-10 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-transparent flex flex-col gap-8">
          {aircraft.timeline.map((event) => (
            <div key={event.id} className="relative group">
              
              {/* Timeline Tick Node */}
              <div className="absolute -left-[30px] md:-left-[46px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:bg-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/20" />
              
              {/* Timeline Info Card */}
              <div className="bg-[#0b1329]/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/30 shadow-xl hover:shadow-cyan-500/2 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="text-sm font-extrabold font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-md self-start">
                    {event.year}
                  </span>
                  <h4 className="font-display text-lg font-bold text-slate-100 group-hover:text-white transition-colors duration-300">
                    {event.title}
                  </h4>
                </div>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{event.description}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AircraftDetails;
