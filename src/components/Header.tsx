import React, { useState } from 'react';
import { Menu, X, Shield, Lock, Fingerprint } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onAdminClick, activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { label: 'Início', id: 'inicio' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'História', id: 'historia' },
    { label: 'Pilares', id: 'pilares' },
    { label: 'Diretoria', id: 'diretoria' },
    { label: 'Especialidades', id: 'especialidades' },
    { label: 'Vocacional', id: 'vocacional' },
    { label: 'Biblioteca', id: 'biblioteca' },
    { label: 'Quiz', id: 'quiz' },
    { label: 'Galeria', id: 'galeria' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Seletivo', id: 'seletivo' },
    { label: 'Contato', id: 'contato' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full glassmorphism border-b border-blue-500/10 px-4 py-3 md:px-8 text-white transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand / Futuristic HUD style */}
          <div 
            onClick={() => handleLinkClick('inicio')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center h-10 w-10 rounded-lg border border-blue-500/30 bg-blue-950/20 group-hover:border-yellow-400 group-hover:shadow-[0_0_10px_#FFD000] transition-all duration-300">
              <Fingerprint className="h-6 w-6 text-blue-400 group-hover:text-yellow-400 transition-colors duration-300" />
              <div className="absolute inset-0 h-full w-full rounded-lg border border-transparent group-hover:border-yellow-400/20 animate-pulse-glow" />
            </div>
            <div>
              <h1 className="font-display font-bold tracking-wider text-sm leading-none text-white">
                LACIF <span className="text-yellow-400 font-mono">UFF</span>
              </h1>
              <span className="font-mono text-[9px] text-blue-400/70 tracking-widest uppercase block mt-1">
                Forensic Sciences
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-md font-sans text-xs tracking-wide transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-yellow-400 bg-blue-950/30 border border-yellow-400/20 font-medium'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Customization Controls */}
          <div className="hidden xl:flex items-center gap-3">
            <button
              onClick={onAdminClick}
              className="px-4 py-1.5 rounded-lg border border-yellow-400/30 text-yellow-400 font-mono text-xs tracking-wider flex items-center gap-1.5 hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(255,208,0,0.1)] hover:shadow-[0_0_15px_rgba(255,208,0,0.35)]"
            >
              <Lock className="h-3 w-3" />
              ADMINISTRAÇÃO
            </button>
          </div>

          {/* Mobile controls */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={onAdminClick}
              className="p-1.5 rounded-lg border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
              title="Acesso Administrador"
            >
              <Lock className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Side-Drawer with glassmorphic backing */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-[#050505]/80 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } xl:hidden`}
      >
        <div className="mt-12">
          <div className="flex items-center justify-between pb-4 border-b border-blue-500/10 mb-6">
            <span className="font-mono text-[10px] text-blue-400 font-bold uppercase tracking-widest">
              LIGA NAV CONSOLE
            </span>
            <Shield className="h-4 w-4 text-blue-500" />
          </div>
          
          <nav className="flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-2 px-3 text-left rounded-lg text-sm transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-yellow-400 bg-blue-950/40 font-semibold border-l-2 border-yellow-400 pl-4'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-blue-500/10">
          <button
            onClick={() => {
              setIsOpen(false);
              onAdminClick();
            }}
            className="w-full justify-center px-4 py-2 bg-yellow-400 text-black font-mono font-bold text-xs rounded-lg flex items-center gap-2 hover:bg-yellow-300 transition-colors duration-200 shadow-[0_0_15px_rgba(255,208,0,0.2)]"
          >
            <Lock className="h-3.5 w-3.5" />
            ADMINISTRAÇÃO
          </button>
          <span className="font-mono text-[8px] text-gray-600 block text-center mt-4 uppercase">
            LACIF UFF CORP SYSTEM 2026
          </span>
        </div>
      </div>
    </>
  );
}
