import React, { useState } from 'react';
import { FolderOpen, ExternalLink, Camera, Image as ImageIcon, Users, Layers, Calendar, ArrowUpRight } from 'lucide-react';
import { GalleryItem } from '../types.ts';

interface GalleryProps {
  items?: GalleryItem[];
  googleDriveUrl?: string;
}

export default function Gallery({ items = [], googleDriveUrl }: GalleryProps) {
  const defaultUrl = "https://drive.google.com/drive/folders/1YYeI1Z0A5-XQs0L4jFZtwjTi3juKE1tn?usp=drive_link";
  const finalUrl = googleDriveUrl || defaultUrl;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Extract distinct categories from items
  const rawCategories = items.map(i => i.category);
  const categories = ['All', ...Array.from(new Set(rawCategories)).filter(Boolean)];

  const filteredItems = items.filter(item => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto text-white space-y-12">
      <div className="rounded-3xl p-8 md:p-12 glassmorphism border border-yellow-400/20 relative overflow-hidden shadow-2xl space-y-8">
        
        {/* Subtle camera lens target circle grid in background */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent" />
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          
          {/* Aesthetic Folder/Camera Deck Graphic */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-900 border border-white/15 rounded-2xl p-4 flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative group overflow-hidden shrink-0">
            {/* Top Yellow Ribbon tag representing "PHOTOS" */}
            <div className="absolute top-0 right-4 w-12 h-3.5 bg-yellow-400 rounded-b-md flex items-center justify-center">
              <span className="text-[7px] font-mono text-black font-black uppercase">LACIF</span>
            </div>
            
            <div className="flex justify-between items-start mt-2">
              <Camera className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,208,0,0.4)] transition-transform group-hover:scale-110" />
              <span className="font-mono text-[9px] text-gray-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 uppercase">
                GALERIA
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-400 font-bold block leading-none">ÁLBUM DE EVENTOS</span>
              <span className="text-[8px] font-mono text-gray-600 block tracking-widest leading-none uppercase">REGISTROS UFF</span>
            </div>
          </div>

          {/* Texts & details */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-2">
              <h4 className="font-display font-bold text-xl md:text-2xl text-white tracking-wide">
                Galeria de Memórias e Registros Práticos
              </h4>
              <p className="text-gray-300 text-xs md:text-sm font-sans leading-relaxed">
                Explore os momentos práticos, simulações de cenas de crime, encontros de estudo técnico, assembleias e palestras acadêmicas promovidas pelos membros da LACIF nos campi da Universidade Federal Fluminense. Cada imagem representa a excelência, o engajamento e a nossa paixão científica.
              </p>
            </div>

            {/* Extra details indicators */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 pt-2 max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4.5 w-4.5 text-yellow-400 shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 font-mono block uppercase">Arquivo</span>
                  <span className="text-xs text-white font-sans font-semibold">Fotos em Alta Definição</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-yellow-400 shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 font-mono block uppercase">Eventos</span>
                  <span className="text-xs text-white font-sans font-semibold">Simulações & Simpósios</span>
                </div>
              </div>
            </div>

            {/* CTA Link Button to Google Drive of events */}
            <div className="pt-2">
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,208,0,0.25)] hover:shadow-[0_0_30px_rgba(255,208,0,0.45)] transition-all cursor-pointer w-full sm:w-auto"
                id="cta-google-drive-gallery"
              >
                Acessar Álbum no Google Drive <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* DYNAMIC PHOTO WORKLIST SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-950/40 p-4 rounded-2xl border border-white/5">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Filtro de Evidência Visual</span>
          
          <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
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
                {cat === 'All' ? 'Ver Todas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photogrid Layout */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="group relative rounded-2xl bg-zinc-900/40 border border-white/10 overflow-hidden hover:border-yellow-400/40 shadow-lg hover:shadow-[0_0_30px_rgba(255,208,0,0.05)] transition-all flex flex-col h-full"
              >
                {/* Photo frame */}
                <div className="aspect-video w-full overflow-hidden bg-black/80 relative">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-zinc-950">
                      <Camera className="h-8 w-8" />
                    </div>
                  )}

                  {/* Date Tag */}
                  <span className="absolute bottom-3 left-3 bg-black/75 border border-white/10 px-2 py-1 rounded text-[9px] font-mono text-gray-300 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-yellow-400" /> {item.date}
                  </span>
                </div>

                {/* Info Deck */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded uppercase font-bold inline-block">
                      {item.category}
                    </span>
                    <h5 className="font-display font-extrabold text-sm text-white group-hover:text-yellow-400 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h5>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* View image click simulation */}
                  {item.image && (
                    <div className="pt-3 border-t border-white/5 flex items-center justify-end">
                      <a
                        href={item.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        <span>Ver Imagem Ampliada</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-zinc-900/20">
            <Camera className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <h5 className="font-mono text-xs text-gray-400 uppercase">Nenhuma recordação ou foto nesta categoria</h5>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Inscreva-se na liga para compor novas memórias práticos.</p>
          </div>
        )}
      </div>

    </div>
  );
}
