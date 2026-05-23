import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AmbientPoliceLights() {
  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden glassmorphism border border-white/5 h-20 shadow-2xl flex items-center justify-center bg-zinc-950/40">
      
      {/* CSS Keyframes for beautiful, eye-safe police strobe wash */}
      <style>{`
        @keyframes subtle-red-flash {
          0%, 100% { opacity: 0.05; }
          45% { opacity: 0.25; }
          50% { opacity: 0.35; }
          55% { opacity: 0.10; }
        }
        @keyframes subtle-blue-flash {
          0%, 100% { opacity: 0.25; }
          45% { opacity: 0.05; }
          50% { opacity: 0.08; }
          55% { opacity: 0.40; }
        }
        .ambient-police-red {
          animation: subtle-red-flash 1.6s infinite ease-in-out;
        }
        .ambient-police-blue {
          animation: subtle-blue-flash 1.6s infinite ease-in-out;
        }
      `}</style>

      {/* Atmospheric Background Ambient Blurs - Totally non-interactive, eye-friendly */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-red-600/20 blur-[60px] pointer-events-none rounded-full mix-blend-color-dodge ambient-police-red" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-blue-600/20 blur-[60px] pointer-events-none rounded-full mix-blend-color-dodge ambient-police-blue" />
      
      {/* Sleek aesthetic visual lightbar in the center with NO text or buttons */}
      <div className="relative z-10 w-full max-w-md bg-black/80 border border-white/5 p-1.5 rounded-xl overflow-hidden">
        {/* Mock lightbar visualization */}
        <div className="grid grid-cols-6 h-6 gap-1 bg-zinc-950 p-1 rounded-lg overflow-hidden">
          <div className="bg-red-600 rounded ambient-police-red" />
          <div className="bg-red-500 rounded ambient-police-red opacity-80" />
          <div className="bg-zinc-800 rounded flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
          </div>
          <div className="bg-zinc-800 rounded flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
          </div>
          <div className="bg-blue-500 rounded ambient-police-blue opacity-80" />
          <div className="bg-blue-600 rounded ambient-police-blue" />
        </div>
      </div>

    </div>
  );
}
