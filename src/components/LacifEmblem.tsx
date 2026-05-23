import React from 'react';

interface LacifEmblemProps {
  className?: string;
  glow?: boolean;
}

export default function LacifEmblem({ className = "h-12 w-12", glow = true }: LacifEmblemProps) {
  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      <svg 
        viewBox="0 0 300 300" 
        className={`w-full h-full ${glow ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]' : ''}`}
      >
        <defs>
          {/* Top arc path */}
          <path id="text-arc-top-comp" d="M 42 150 A 108 108 0 0 1 258 150" fill="none" />
          {/* Bottom arc path */}
          <path id="text-arc-bottom-comp" d="M 258 150 A 108 108 0 0 1 42 150" fill="none" />
        </defs>

        {/* Outer background circular shape */}
        <circle cx="150" cy="150" r="146" fill="#010102" />
        
        {/* Greyish outer ring border */}
        <circle cx="150" cy="150" r="144" fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle cx="150" cy="150" r="139" fill="none" stroke="#000000" strokeWidth="2" />

        {/* Circular text matching the uploaded UFF emblem photo - highly bold and legible */}
        <text 
          fill="#ffffff" 
          fontWeight="900" 
          letterSpacing="2.8" 
          className="font-sans select-none tracking-widest text-white uppercase text-center"
          style={{ fontSize: '11.8px', fontFamily: '"Inter", "Space Grotesk", sans-serif' }}
        >
          <textPath href="#text-arc-top-comp" startOffset="50%" textAnchor="middle">
            LIGA ACADÊMICA DE CIÊNCIAS FORENSES
          </textPath>
        </text>
        
        <text 
          fill="#ffffff" 
          fontWeight="900" 
          letterSpacing="3.0" 
          className="font-sans select-none tracking-widest text-white uppercase text-center"
          style={{ fontSize: '11.2px', fontFamily: '"Inter", "Space Grotesk", sans-serif' }}
          dy="4"
        >
          <textPath href="#text-arc-bottom-comp" startOffset="50%" textAnchor="middle">
            UNIVERSIDADE FEDERAL FLUMINENSE
          </textPath>
        </text>

        {/* Concentric targets with bright forensic/police blue layout */}
        <circle cx="150" cy="150" r="82" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
        <circle cx="150" cy="150" r="72" fill="none" stroke="#60a5fa" strokeWidth="2.8" />
        <circle cx="150" cy="150" r="50" fill="none" stroke="#3b82f6" strokeWidth="2.2" />
        <circle cx="150" cy="150" r="30" fill="none" stroke="#2563eb" strokeWidth="1.8" />
        <circle cx="150" cy="150" r="10" fill="none" stroke="#3b82f6" strokeWidth="1.8" />

        {/* Precision reticle ticks and crosses */}
        <line x1="42" y1="150" x2="258" y2="150" stroke="#3b82f6" strokeWidth="1.8" />
        <line x1="150" y1="42" x2="150" y2="258" stroke="#3b82f6" strokeWidth="1.8" />

        {/* Micro coordinate markers */}
        <line x1="150" y1="125" x2="150" y2="175" stroke="#60a5fa" strokeWidth="1.2" opacity="0.5" />
        <line x1="125" y1="150" x2="175" y2="150" stroke="#60a5fa" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </div>
  );
}
