import React from 'react';

interface PoliceTapeProps {
  rotated?: boolean;
}

export default function PoliceTape({ rotated = false }: PoliceTapeProps) {
  return (
    <div className={`relative w-full overflow-hidden select-none z-20 ${rotated ? 'py-4 my-10 -rotate-2 scale-102 shadow-[0_10px_20px_rgba(0,0,0,0.5)]' : 'py-3'}`}>
      <style>{`
        @keyframes marquee-police {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container-tape {
          display: flex;
          white-space: nowrap;
          animation: marquee-police 25s linear infinite;
        }
      `}</style>
      
      {/* Tape Base with classic yellow/black caution forensic style */}
      <div className="absolute inset-0 bg-[#FFD000] border-y-4 border-black" />
      
      {/* Diagonal safety stripes background */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 10px, transparent 10px, transparent 20px)',
        }}
      />

      {/* Marquee scrolling text thread */}
      <div className="relative z-10 w-full flex items-center h-6 overflow-hidden">
        <div className="marquee-container-tape text-black font-mono font-black text-[11px] tracking-[0.15em] uppercase flex gap-12 shrink-0">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span>⚠️ POLÍCIA CIENTÍFICA LACIF UFF • CENA DE CRIME • NÃO ULTRAPASSE</span>
              <span className="text-[13px]">///</span>
              <span>⚠️ CRIME SCENE • DO NOT CROSS • LAW & SCIENCE</span>
              <span className="text-[13px]">\\\</span>
              <span>⚠️ CADEIA DE CUSTÓDIA PRESERVADA • ESTUDO ACADÊMICO</span>
              <span className="text-[13px]">///</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
