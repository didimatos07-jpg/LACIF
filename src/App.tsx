import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, 
  Lock, 
  BookOpen, 
  Users, 
  CheckCircle, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  MapPin, 
  Instagram, 
  Youtube, 
  Compass, 
  Trophy, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  Award, 
  ArrowRight, 
  ExternalLink,
  MessageSquare,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

import { SiteContent, Director, ForensicSpecialty, LibraryItem, GalleryItem } from './types.ts';
import { INITIAL_CONTENT } from './mockData.ts';

// Core Subcomponents
import Header from './components/Header.tsx';
import ScannerHUD from './components/ScannerHUD.tsx';
import VocationalTest from './components/VocationalTest.tsx';
import ForensicQuiz from './components/ForensicQuiz.tsx';
import Library from './components/Library.tsx';
import Gallery from './components/Gallery.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import PoliceTape from './components/PoliceTape.tsx';
import AmbientPoliceLights from './components/AmbientPoliceLights.tsx';

export default function App() {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [activeSection, setActiveSection] = useState('inicio');
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<ForensicSpecialty | null>(null);
  const [activeMapStage, setActiveMapStage] = useState<'preservacao' | 'fixacao' | 'coleta' | 'analise'>('preservacao');
  const [activeActivityTab, setActiveActivityTab] = useState<'all' | 'simulado' | 'workshop' | 'seminario'>('all');

  // Load and cache State seamlessly
  useEffect(() => {
    const cached = localStorage.getItem('lacif_site_content_2026');
    if (cached) {
      try {
        setContent(JSON.parse(cached));
      } catch (err) {
        console.error("Erro de leitura do banco de custódia local, restaurando padrões.", err);
      }
    }
  }, []);

  const handleUpdateContent = (updated: SiteContent) => {
    setContent(updated);
    localStorage.setItem('lacif_site_content_2026', JSON.stringify(updated));
  };

  const handleResetToDefaults = () => {
    setContent(INITIAL_CONTENT);
    localStorage.removeItem('lacif_site_content_2026');
  };

  // Smooth scroll and active tracker updates
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative selection:bg-yellow-400 selection:text-black">
      
      {/* Background neon grid effect */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none z-0" />

      {/* Header element */}
      <Header 
        onAdminClick={() => setShowAdmin(true)} 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      <main className="flex-1 relative z-10">

        {/* ================= AMBIENT NON-INTERACTIVE POLICE SIREN LAMPS ================= */}
        <div className="pt-8 px-4 md:px-8">
          <AmbientPoliceLights />
        </div>

        {/* ================= HERO SECTION ================= */}
        <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center p-4 md:p-8 pt-12 md:pt-20 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Display Headings & Interactive call to arms */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-950/30 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-blue-400 font-mono text-xs uppercase tracking-widest leading-none">
                <ShieldCheck className="h-4 w-4 animate-pulse-glow" strokeWidth={2.5} />
                LIGA ACADÊMICA OFICIAL — UFF
              </div>

              <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                {content.heroTitle}
              </h2>

              <p className="font-display text-lg md:text-2xl text-yellow-400 tracking-wide font-medium">
                “{content.heroSubtitle}”
              </p>

              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Seja bem-vindo ao portal oficial da <span className="text-white font-medium">LACIF UFF</span>. Unimos acadêmicos de farmácia, biologia, química, direito e computação na busca por respostas absolutas através do rigor metodológico criminal.
              </p>

              {/* Grid actions buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => handleNavigate('sobre')}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,123,255,0.3)] hover:shadow-[0_0_25px_rgba(0,123,255,0.5)] transition-all cursor-pointer"
                >
                  Conheça a Liga <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleNavigate('especialidades')}
                  className="w-full sm:w-auto px-6 py-3 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Explorar Áreas Forenses
                </button>
                <button
                  onClick={() => handleNavigate('seletivo')}
                  className="w-full sm:w-auto px-6 py-3 bg-zinc-900 border border-white/5 hover:border-white/10 text-gray-300 hover:text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Processo Seletivo
                </button>
              </div>

              {/* Simple metrics summary bar */}
              <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto lg:mx-0 border-t border-white/5 font-mono">
                <div className="text-center lg:text-left">
                  <span className="text-xs text-gray-500 block uppercase">Especialidades</span>
                  <span className="text-xl font-bold text-white leading-none mt-1 block">09 Áreas</span>
                </div>
                <div className="text-center lg:text-left border-x border-white/5 px-4">
                  <span className="text-xs text-gray-500 block uppercase font-mono">Estudos</span>
                  <span className="text-xl font-bold text-white leading-none mt-1 block">Pesquisas</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="text-xs text-gray-500 block uppercase">Origem</span>
                  <span className="text-xl font-bold text-yellow-400 leading-none mt-1 block font-display">UFF Niterói</span>
                </div>
              </div>
            </div>

            {/* Right scanner holographic telemetry box */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="w-full max-w-sm">
                <ScannerHUD />
              </div>
            </div>

          </div>
        </section>

        {/* ================= POLICE TAPE SEPARATOR ================= */}
        <PoliceTape rotated={true} />

        {/* ================= SOBRE A LIGA ================= */}
        <section id="sobre" className="py-20 px-4 md:px-8 bg-[#081421]/20 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-block bg-blue-900/20 border border-blue-500/20 px-3 py-1 rounded text-blue-400 font-mono text-[10px] uppercase tracking-widest">
                EIXO INSTITUCIONAL
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Compromisso com a Ciência Forense
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Nossos valores determinam o rigor de cada pesquisa. Como liga acadêmica, construímos pontes sólidas entre a teoria universitária e a solução de litígios jurídicos reais.
              </p>
            </div>

            {/* Mission, Vision, Values layout grids */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Mission */}
              <div className="p-8 rounded-2xl glassmorphism border border-blue-500/15 relative overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(0,123,255,0.05)] transition-all duration-300">
                <span className="absolute -top-6 -right-6 font-display font-black text-8xl text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">M</span>
                <span className="text-xs font-mono text-blue-400 font-semibold block mb-2 tracking-widest uppercase">Missão</span>
                <h4 className="font-display font-bold text-white text-lg mb-3">Integrar e Capacitar</h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {content.mission}
                </p>
              </div>

              {/* Vision */}
              <div className="p-8 rounded-2xl glassmorphism border border-blue-500/15 relative overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(0,123,255,0.05)] transition-all duration-300">
                <span className="absolute -top-6 -right-6 font-display font-black text-8xl text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">V</span>
                <span className="text-xs font-mono text-blue-400 font-semibold block mb-2 tracking-widest uppercase">Visão</span>
                <h4 className="font-display font-bold text-white text-lg mb-3">Tornar-se Referência</h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {content.vision}
                </p>
              </div>

              {/* Values list */}
              <div className="p-8 rounded-2xl glassmorphism border border-yellow-400/20 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(255,208,0,0.05)] transition-all duration-300">
                <span className="absolute -top-6 -right-6 font-display font-black text-8xl text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">V</span>
                <span className="text-xs font-mono text-yellow-400 font-semibold block mb-2 tracking-widest uppercase">Valores</span>
                <h4 className="font-display font-bold text-white text-lg mb-4">Nossos Alicerces</h4>
                <ul className="space-y-2">
                  {content.values.map((val, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-center gap-1.5 font-sans">
                      <Zap className="h-3 w-3 text-yellow-400 shrink-0" />
                      {val}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </section>


        {/* ================= HISTÓRIA ================= */}
        <section id="historia" className="py-20 px-4 md:px-8 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Image Panel */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl filter blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 z-10 shadow-2xl">
                <img 
                  src={content.historyImage} 
                  alt="Time LACIF UFF" 
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-65" />
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-mono rounded-lg border border-white/10 tracking-widest uppercase text-yellow-400">
                  HISTÓRIA DO TIME CIENTÍFICO — UFF
                </span>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-yellow-400/15 border border-yellow-400/20 px-3 py-1 rounded text-yellow-400 font-mono text-[10px] uppercase tracking-widest">
                CONHEÇA NOSSA HISTÓRIA
              </div>
              
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Como nascemos para servir à verdade
              </h3>

              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 font-sans max-w-3xl">
                {content.historyText.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Decorative Simulation Stats */}
              <div className="grid grid-cols-2 gap-4 max-w-sm pt-4 border-t border-white/5 font-mono">
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center sm:text-left">
                  <span className="text-[10px] text-gray-500 block uppercase">Aulas e Práticas</span>
                  <span className="text-lg font-bold text-white">Simulações Ativas</span>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center sm:text-left">
                  <span className="text-[10px] text-gray-500 block uppercase">Integração</span>
                  <span className="text-lg font-bold text-yellow-400">Multidisciplinar</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ================= PILARES ================= */}
        <section id="pilares" className="py-20 px-4 md:px-8 bg-[#081421]/20 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block bg-blue-900/25 border border-blue-500/20 px-3 py-1 rounded text-blue-400 font-mono text-[10px] uppercase tracking-widest">
                TRIADE UNIVERSITÁRIA
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Nossos Três Pilares Acadêmicos
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pillar 1: Ensino */}
              <div className="p-8 rounded-2xl glassmorphism border border-blue-500/15 hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(255,208,0,0.05)] transition-all duration-300 text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-blue-400">
                  <Award className="h-6 w-6 animate-pulse-glow" />
                </div>
                <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider">Ensino</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  Aulas, cursos livres de criminologia, palestras com peritos federais oficiais, workshops práticos e capacitações frequentes para os membros ligantes.
                </p>
              </div>

              {/* Pillar 2: Pesquisa */}
              <div className="p-8 rounded-2xl glassmorphism border border-blue-500/15 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(0,123,255,0.05)] transition-all duration-300 text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-yellow-400">
                  <Fingerprint className="h-6 w-6 animate-pulse" />
                </div>
                <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider">Pesquisa</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  Projetos científicos embasados em dados, produção acadêmica de laudos simulados, teses revisórias e acompanhamento de inovações tecnológicas globais de laboratórios forenses.
                </p>
              </div>

              {/* Pillar 3: Extensão */}
              <div className="p-8 rounded-2xl glassmorphism border border-blue-500/15 hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(255,208,0,0.05)] transition-all duration-300 text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-blue-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider">Extensão</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  Divulgação científica democratizada para o público geral, feiras de biologia molecular e integração participativa com a sociedade do Rio de Janeiro.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ================= DIRETORIA ================= */}
        <section id="diretoria" className="py-20 px-4 md:px-8 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block bg-yellow-400/15 border border-yellow-400/25 px-3 py-1 rounded text-yellow-400 font-mono text-[10px] uppercase tracking-widest">
                QUADRO ACADÊMICO
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Diretoria de Custódia & Docentes
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Professores doutores coordenadores e ligantes empenhados na gerência unificada das Ciências Forenses na UFF.
              </p>
            </div>

            {/* Directors cards list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.directors.map((m) => (
                <div 
                  key={m.id}
                  className="glassmorphism rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_20px_rgba(255,208,0,0.15)] flex flex-col justify-between transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden bg-white/5 border-b border-white/10">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300" />
                    
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[#FFD000] border border-[#FFD000]/20 font-mono text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider font-bold">
                      {m.role}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-white text-base leading-tight group-hover:text-yellow-400 transition-colors">
                        {m.name}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400 uppercase mt-0.5 block leading-none">
                        Depto: {m.department}
                      </span>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed mt-3 pt-3 border-t border-white/5">
                        {m.bio}
                      </p>
                    </div>

                    <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-white/5">
                      <a 
                        href={m.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
                      >
                        <Instagram className="h-3 w-3" strokeWidth={2.5} /> Instagram
                      </a>
                      <a 
                        href={m.lattes} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-gray-400 hover:text-yellow-400 hover:border-yellow-400/35 transition-all flex items-center gap-1.5"
                      >
                        CNPQ Lattes
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ================= ESPECIALIDADES FORENSES ================= */}
        <section id="especialidades" className="py-20 px-4 md:px-8 bg-[#081421]/20 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-block bg-blue-900/25 border border-blue-500/20 px-3 py-1 rounded text-blue-400 font-mono text-[10px] uppercase tracking-widest">
                CONHECIMENTO APLICADO
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Especialidades Forenses e Perícias
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                As Ciências Forenses abraçam do micro ao macro. Clique nos cartões tecnológicos para ler o parecer expandido de cada grande ramo da ementa de estudos da nossa liga.
              </p>
            </div>

            {/* specialties list layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.specialties.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedSpecialty(s)}
                  className={`p-5 rounded-2xl glassmorphism border border-blue-500/10 flex flex-col justify-between hover:shadow-[0_0_15px_rgba(0,123,255,0.15)] transition-all duration-300 group cursor-pointer ${
                    s.glowColor === 'yellow' ? 'hover:border-yellow-400/40' : 'hover:border-blue-500/40'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      <img 
                        src={s.image} 
                        alt={s.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono rounded-md border border-white/10 uppercase tracking-widest text-[#FFD000]">
                        CIÊNCIAS FORENSES
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-semibold text-lg text-white group-hover:text-yellow-400 transition-colors leading-tight">
                        {s.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-2 font-sans leading-relaxed line-clamp-3">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {s.skills.slice(0, 2).map((sk, index) => (
                        <span key={index} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/10 text-gray-400">
                          {sk}
                        </span>
                      ))}
                    </div>
                    
                    <span className="text-[10px] font-mono text-blue-400 group-hover:text-yellow-400 hover:underline transition-all flex items-center gap-1">
                      LER LAUDO EXPANDIDO <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>



          </div>
        </section>


        {/* ================= ESPECIALIDADE EXPANDED MODAL ================= */}
        {selectedSpecialty && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedSpecialty(null)}
          >
            <div 
              className="w-full max-w-2xl bg-[#050505]/80 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl relative shadow-2xl animated-zoom-in text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="absolute -top-3 -right-3 h-[32px] w-[32px] rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center border border-white transition-colors cursor-pointer text-xs font-mono"
              >
                [X]
              </button>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/10">
                <img 
                  src={selectedSpecialty.image} 
                  alt={selectedSpecialty.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-xs text-yellow-400 rounded border border-white/10 uppercase">
                  LAUDO TÉCNICO INTERNO
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-extrabold text-white text-2xl md:text-3xl">
                  {selectedSpecialty.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  {selectedSpecialty.detailedDescription}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="font-mono text-xs text-[#FFD000] tracking-widest uppercase font-bold">
                    Habilidades e Equipamentos de Ementa Criminal:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecialty.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-white/5 backdrop-blur-sm px-3 py-1 border border-white/10 text-xs font-mono text-gray-200 rounded-lg"
                      >
                        🔬 {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center text-[9px] font-mono text-gray-600 pt-4 border-t border-white/5">
                <span>ESTA ÁREA COMPÕE O EDITAL DE ADMISSÃO DA LACIF UFF</span>
                <span>ID: {selectedSpecialty.id.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}


        {/* ================= TESTE VOCACIONAL ================= */}
        <section id="vocacional" className="py-20 px-4 md:px-8 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block bg-yellow-400/15 border border-yellow-400/25 px-3 py-1 rounded text-yellow-400 font-mono text-[10px] uppercase tracking-widest">
                DIAGNÓSTICO ACADÊMICO
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Teste Vocacional Forense
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Responda a 15 perguntas dinâmicas e descubra qual ramo da perícia criminal e ciências biológico-forenses mais se assemelha às suas aptidões mentais!
              </p>
            </div>

            {/* Mount Vocational Test core */}
            <VocationalTest 
              questions={content.vocationalQuestions} 
              results={content.vocationalResults} 
            />

          </div>
        </section>


        {/* ================= QUIZ FORENSE ================= */}
        <section id="quiz" className="py-20 px-4 md:px-8 bg-[#081421]/20 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block bg-blue-900/25 border border-blue-500/20 px-3 py-1 rounded text-blue-400 font-mono text-[10px] uppercase tracking-widest">
                AVALIAÇÃO CIENTÍFICA
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Quiz Investigativo de Local de Crime
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Teste seus conhecimentos teóricos sobre as leis penais, preservação primária e cadeia de custódia aplicados a exames fáticos periciais em 10 perguntas aleatórias.
              </p>
            </div>

            {/* Mount Forensic Quiz core */}
            <ForensicQuiz 
              questions={content.quizQuestions} 
              externalQuizzes={content.externalQuizzes} 
            />

          </div>
        </section>


        {/* ================= BIBLIOTECA FORENSE ================= */}
        <section id="biblioteca" className="py-20 px-4 md:px-8 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-block bg-yellow-400/15 border border-yellow-400/25 px-3 py-1 rounded text-yellow-400 font-mono text-[10px] uppercase tracking-widest">
                ACERVO DIGITAL DE CUSTÓDIA
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Biblioteca Criminológica LACIF UFF
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans">
                Acesse livros acadêmicos, laudos simulados de referência, manuais técnicos de custódia e periódicos indicados pelos coordenadores da Liga.
              </p>
            </div>

            {/* Mount Library component */}
            <Library 
              libraryDriveUrl={content.libraryDriveUrl}
            />

          </div>
        </section>


        {/* ================= GALERIA DE MEMÓRIAS ================= */}
        <section id="galeria" className="py-20 px-4 md:px-8 bg-[#081421]/20 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block bg-blue-900/25 border border-blue-500/20 px-3 py-1 rounded text-blue-400 font-mono text-[10px] uppercase tracking-widest">
                MURAL DE FOTOS E REGISTROS
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Galerias da LACIF
              </h3>
            </div>

            {/* Mount Corkboard Gallery component */}
            <Gallery 
              items={content.galleryItems} 
              googleDriveUrl={content.googleDriveUrl}
            />

          </div>
        </section>


        {/* ================= FAQ SEÇÃO ================= */}
        <section id="faq" className="py-20 px-4 md:px-8 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block bg-yellow-400/15 border border-yellow-400/25 px-3 py-1 rounded text-yellow-400 font-mono text-[10px] uppercase tracking-widest">
                DÚVIDAS FREQUENTES
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                FAQ de Preservação e Dúvidas
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Reunimos as respostas científicas e burocráticas mais frequentes para facilitar seu ingresso e acompanhamento da nossa liga acadêmica.
              </p>
            </div>

            {/* FAQ Accordion layout design */}
            <div className="max-w-3xl mx-auto space-y-4">
              {content.faqs.map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="border border-white/10 rounded-xl bg-white/5 overflow-hidden hover:border-blue-500/20 transition-all font-sans"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="w-full p-5 text-left flex items-center justify-between text-white font-medium text-sm md:text-base cursor-pointer focus:outline-none"
                    >
                      <span className="pr-4 leading-tight">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4.5 w-4.5 text-yellow-400 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4.5 w-4.5 text-gray-500 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-5 pt-0 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/10 animated-fade-in bg-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* ================= PROCESSO SELETIVO ================= */}
        <section id="seletivo" className="py-24 px-4 md:px-8 bg-[#081421]/15 border-b border-blue-500/10 relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 px-3.5 py-1.5 rounded-full text-yellow-400 font-mono text-xs uppercase tracking-widest">
                <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> ADMISSÃO & INGRESSO
              </div>
              <h3 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight">
                Processo Seletivo LACIF UFF
              </h3>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
                Deseja integrar oficialmente o corpo de pesquisadores, peritos acadêmicos e participar de simulados presenciais da Liga Acadêmica de Ciências Forenses da Universidade Federal Fluminense? Realize sua inscrição preenchendo o formulário oficial no link abaixo.
              </p>
            </div>

            <div className="p-8 md:p-12 rounded-3xl glassmorphism border border-white/10 max-w-2xl mx-auto relative overflow-hidden shadow-2xl space-y-6">
              {/* Visual laser scanners for design */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-yellow-400/60 shadow-[0_0_15px_rgba(255,208,0,0.8)] animate-pulse" />
              
              <p className="text-gray-300 text-xs md:text-sm font-sans font-medium">
                Caso as inscrições estejam temporariamente encerradas, as respostas enviadas servirão como cadastro de reserva de vagas de custódia técnico-científica.
              </p>

              {content.selectiveProcess.subscriptionUrl ? (
                <a 
                  href={content.selectiveProcess.subscriptionUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,208,0,0.25)] hover:shadow-[0_0_30px_rgba(255,208,0,0.45)] transition-all cursor-pointer w-full sm:w-auto"
                >
                  PREENCHER FORMULÁRIO DE INSCRIÇÃO (GOOGLE FORMS) <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              ) : (
                <div className="py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 font-mono inline-block">
                  🔒 FORMULÁRIO INDISPONÍVEL NO MOMENTO (AGUARDANDO EDITAIS)
                </div>
              )}
            </div>

          </div>
        </section>


        {/* ================= CONTATO ================= */}
        <section id="contato" className="py-20 px-4 md:px-8 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block bg-yellow-400/15 border border-yellow-400/25 px-3 py-1 rounded text-yellow-400 font-mono text-[10px] uppercase tracking-widest">
                LIGA DE CONEXÕES
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white">
                Fale com Nossos Peritos
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Mande uma mensagem direta ou e-mail institucional direto para os coordenadores e equipe de pesquisa forense da Liga.
              </p>
            </div>

            {/* Optimized 3-column interactive contact layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-white">
              
              {/* Instagram Card */}
              <a 
                href={content.contact.instagram}
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-8 rounded-3xl glassmorphism border border-white/10 hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(255,208,0,0.1)] flex flex-col justify-between transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="space-y-4">
                  <div className="bg-yellow-400/10 h-12 w-12 rounded-2xl flex items-center justify-center text-yellow-500 border border-yellow-400/20 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300 shrink-0">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-gray-500 uppercase tracking-widest">Instagram Oficial</h4>
                    <p className="text-lg font-sans font-bold text-white mt-1 group-hover:text-yellow-400 transition-colors">@lacifuff.oficial</p>
                    <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">
                      Siga nossa página para acompanhar as análises, novidades das disciplinas e notícias de processos seletivos.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-yellow-400 hover:text-yellow-300">
                  <span>SEGUIR NO INSTAGRAM</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>

              {/* YouTube Card */}
              <a 
                href={content.contact.youtube}
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-8 rounded-3xl glassmorphism border border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(0,123,255,0.1)] flex flex-col justify-between transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="space-y-4">
                  <div className="bg-blue-600/10 h-12 w-12 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-gray-500 uppercase tracking-widest">Canal de Seminários</h4>
                    <p className="text-lg font-sans font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">LACIF UFF Forensics</p>
                    <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">
                      Assista nossas aulas abertasgravadas, simpósios científicos passados, debates em mesa redonda e webinars didáticos.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-blue-400 hover:text-white">
                  <span>ACESSAR PLAYLISTS</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>

              {/* E-mail Card */}
              <a 
                href={`mailto:${content.contact.email}`}
                className="p-8 rounded-3xl glassmorphism border border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col justify-between transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 h-12 w-12 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300 shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-gray-500 uppercase tracking-widest">E-mail Institucional</h4>
                    <p className="text-base font-mono text-white mt-1 group-hover:text-emerald-400 transition-colors break-all leading-tight">
                      {content.contact.email}
                    </p>
                    <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">
                      Canal oficial direcionado a outras entidades acadêmicas, editores, órgãos governamentais ou dúvidas sobre admissões.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-emerald-400 hover:text-emerald-300">
                  <span>ENVIAR E-MAIL DE OFÍCIO</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>

            </div>

          </div>
        </section>

        {/* ================= BOTTOM POLICE TAPE BANNER ================= */}
        <PoliceTape rotated={false} />

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#050505]/80 backdrop-blur-md border-t border-white/10 py-10 px-4 text-center text-gray-500 text-xs font-mono select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs">
          
          <div className="flex items-center gap-2 text-white">
            <Fingerprint className="h-5 w-5 text-blue-500" />
            <span className="font-display font-bold text-sm tracking-wider">
              LACIF <span className="text-yellow-400 font-mono">UFF</span>
            </span>
          </div>

          <p className="text-gray-500 text-center text-[11px]">
            © {new Date().getFullYear()} LACIF UFF. Ciências Forenses ao Serviço da Verdade e do Ensino Público Fluminense.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => handleNavigate('inicio')}
              className="hover:text-white transition-colors"
            >
              Início
            </button>
            <span>•</span>
            <button 
              onClick={() => setShowAdmin(true)}
              className="text-yellow-400 hover:text-white transition-colors flex items-center gap-1 font-mono"
            >
              <Lock className="h-3 w-3" /> ADMIN
            </button>
          </div>
          
        </div>
      </footer>

      {/* Admin Panel overlay widget */}
      {showAdmin && (
        <AdminPanel
          content={content}
          onUpdateContent={handleUpdateContent}
          onClose={() => setShowAdmin(false)}
          onResetToDefaults={handleResetToDefaults}
        />
      )}

    </div>
  );
}
