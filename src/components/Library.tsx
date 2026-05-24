import React, { useState } from 'react';
import { FolderOpen, ExternalLink, ShieldAlert, BookOpen, Layers, Search, FileText, Link as LinkIcon, BookOpenCheck } from 'lucide-react';
import { LibraryItem } from '../types.ts';

interface LibraryProps {
  items?: LibraryItem[];
  libraryDriveUrl?: string;
}

export default function Library({ items = [], libraryDriveUrl }: LibraryProps) {
  const defaultUrl = "https://drive.google.com/drive/folders/18Px836g0VtCCV10F-mso68N6HuyNuSfy?usp=sharing";
  const finalUrl = libraryDriveUrl || defaultUrl;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Livro', 'Artigo', 'Documentário', 'Técnica', 'PDF', 'Protocolo', 'Estudo de Caso'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto text-white space-y-12">
      <div className="rounded-3xl p-8 md:p-12 glassmorphism border border-yellow-400/20 relative overflow-hidden shadow-2xl space-y-8">
        
        {/* Abstract forensic/security grid backing */}
        <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />
        
        {/* Graphic Folder Binder Representation */}
        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          
          {/* Aesthetic Folder Graphic */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-900 border border-white/15 rounded-2xl p-4 flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative group overflow-hidden shrink-0">
            {/* Folder Tab top left */}
            <div className="absolute top-0 left-4 w-12 h-3 bg-zinc-800 rounded-t-md border-t border-x border-white/10" />
            <div className="absolute top-2 left-0 w-full h-[2px] bg-yellow-400/60" />
            
            <div className="flex justify-between items-start mt-2">
              <FolderOpen className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,208,0,0.4)] transition-transform group-hover:scale-110" />
              <span className="font-mono text-[9px] text-gray-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 uppercase">
                UFF
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-400 font-bold block leading-none">BIBLIOTECA</span>
              <span className="text-[8px] font-mono text-gray-600 block tracking-widest leading-none uppercase">LACIF DIGITAL</span>
            </div>
          </div>

          {/* Text and details */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-2">
              <h4 className="font-display font-bold text-xl md:text-2xl text-white tracking-wide">
                Repositório Central de Materiais Criminológicos
              </h4>
              <p className="text-gray-300 text-xs md:text-sm font-sans leading-relaxed">
                Todo o acervo de livros clássicos, laudos simulados, manuais governamentais de custódia e artigos produzidos pelos membros estão hospedados e organizados de forma centralizada em nossa nuvem segura do Google Drive.
              </p>
            </div>

            {/* Extra details indicator metadata */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 pt-2 max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-yellow-400 shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 font-mono block uppercase">Formato</span>
                  <span className="text-xs text-white font-sans font-semibold">PDFs e Manuais</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-yellow-400 shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 font-mono block uppercase">Acesso</span>
                  <span className="text-xs text-white font-sans font-semibold">Livre Púb. UFF</span>
                </div>
              </div>
            </div>

            {/* CTA Link Button */}
            <div className="pt-2">
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,208,0,0.25)] hover:shadow-[0_0_30px_rgba(255,208,0,0.45)] transition-all cursor-pointer w-full sm:w-auto"
                id="cta-google-drive-lib"
              >
                Acessar Pasta Virtual no Google Drive <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Warning banner bottom */}
        <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/10 flex items-start gap-3 mt-4">
          <ShieldAlert className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-400 leading-normal font-sans">
            <strong className="text-yellow-400">Nota Acadêmica:</strong> Por motivos de cadeia de custódia científica, o material catalogado destina-se estritamente ao amparo acadêmico e de simulação didática, sob licença de estudo universitário livre da Universidade Federal Fluminense.
          </p>
        </div>

      </div>

      {/* DYNAMIC CATALOGUE GRID SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-950/40 p-4 rounded-2xl border border-white/5">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Search className="h-4 w-4" />
            </span>
            <input 
              type="text"
              placeholder="Pesquisar nos registros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
              id="search-library-records"
            />
          </div>

          {/* Categories list slider/wrapper */}
          <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-[10px] font-mono rounded-lg border uppercase shrink-0 transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-yellow-400 text-black font-bold border-yellow-400' 
                    : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'Ver Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="group relative rounded-2xl p-5 bg-zinc-900/60 border border-white/10 hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(255,208,0,0.05)] transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Visual side accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-20" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-mono text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                      {item.category}
                    </span>
                    {item.fileSize && (
                      <span className="text-[9px] font-mono text-gray-500">
                        {item.fileSize}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-display font-extrabold text-sm text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {item.title}
                    </h5>
                    <p className="text-[10px] font-mono text-gray-500">
                      por <span className="text-gray-400">{item.author}</span>
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-gray-500 uppercase">
                    {item.fileType === 'pdf' ? '📄 Documento PDF' : item.fileType === 'image' ? '🖼️ Arquivo de Imagem' : '🔗 Link do Recurso'}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono text-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    <span>Acessar</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-zinc-900/20">
            <BookOpenCheck className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <h5 className="font-mono text-xs text-gray-400 uppercase">Nenhum registro catalogado encontrado</h5>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Refine o filtro de categoria ou termo de busca.</p>
          </div>
        )}
      </div>

    </div>
  );
}
