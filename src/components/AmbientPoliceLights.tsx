import React from 'react';

export default function AmbientPoliceLights() {
  return (
    <div className="relative w-full max-w-5xl mx-auto h-2 bg-gradient-to-r from-red-600 via-zinc-950 to-blue-500 rounded-full overflow-hidden opacity-80 blur-[1px]">
      <style>{`
        @keyframes strobe-red {
          0%, 100% { opacity: 0.15; filter: drop-shadow(0 0 2px rgba(239, 68, 68, 0.2)); }
          50% { opacity: 0.95; filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.8)); }
        }
        @keyframes strobe-blue {
          0%, 100% { opacity: 0.95; filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.8)); }
          50% { opacity: 0.15; filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.2)); }
        }
        .animate-strobe-red {
          animation: strobe-red 1.2s infinite ease-in-out;
        }
        .animate-strobe-blue {
          animation: strobe-blue 1.2s infinite ease-in-out;
        }
      `}</style>
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-red-600 animate-strobe-red" />
        <div className="w-1/2 h-full bg-blue-500 animate-strobe-blue" />
      </div>
    </div>
  );
}
