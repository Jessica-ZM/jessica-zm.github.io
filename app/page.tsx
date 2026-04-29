"use client";

import React, { useState } from 'react';
import { Info, MonitorPlay, Zap } from 'lucide-react';

/**
 * INTERFACES DE TYPESCRIPT
 */
interface Category {
  id: string;
  name: string;
  color: string;
  border: string;
}

interface VideoStandard {
  id: string;
  cat: string;
  name: string;
  start: number;
  end: number;
  desc: string;
}

interface HistoricalEra {
  name: string;
  start: number;
  end: number;
  color: string;
}

// === DATOS DE LA LÍNEA DE TIEMPO ===
const categories: Category[] = [
  { id: 'itu', name: 'ITU-T', color: 'bg-orange-500 text-white', border: 'border-orange-600' },
  { id: 'joint', name: 'Joint (ITU-T & ISO/IEC)', color: 'bg-blue-500 text-white', border: 'border-blue-600' },
  { id: 'iso', name: 'ISO/IEC', color: 'bg-red-600 text-white', border: 'border-red-700' },
  { id: 'smpte', name: 'SMPTE', color: 'bg-green-500 text-white', border: 'border-green-600' },
  { id: 'google', name: 'Google (Open Source)', color: 'bg-teal-500 text-white', border: 'border-teal-600' },
  { id: 'aomedia', name: 'AOMedia', color: 'bg-indigo-600 text-white', border: 'border-indigo-700' },
  { id: 'avs', name: 'AVS (China)', color: 'bg-yellow-400 text-slate-900', border: 'border-yellow-500' }
];

const standards: VideoStandard[] = [
  { id: 'h120', cat: 'itu', name: 'H.120', start: 1984, end: 1988, desc: 'Primer estándar de codificación de video digital internacional.' },
  { id: 'h261', cat: 'itu', name: 'H.261', start: 1989, end: 1993, desc: 'Pionero en la compensación de movimiento y transformadas de bloque, base de todos los códecs modernos.' },
  { id: 'mpeg1', cat: 'iso', name: 'MPEG-1', start: 1992, end: 1995, desc: 'Famoso mundialmente por introducir el formato MP3 (para audio) y el Video CD (VCD).' },
  { id: 'mpeg2', cat: 'joint', name: 'H.262 / MPEG-2', start: 1994, end: 1998, desc: 'Trabajo conjunto de inmenso éxito. Estándar para DVD y transmisión de TV digital estándar.' },
  { id: 'h263', cat: 'itu', name: 'H.263', start: 1995, end: 2000, desc: 'Optimizado para bajas tasas de bits, utilizado en las primeras videoconferencias por internet.' },
  { id: 'mpeg4v', cat: 'iso', name: 'MPEG-4 Visual', start: 1998, end: 2002, desc: 'Mejoró la compresión respecto a MPEG-2. Muy popular en formatos como DivX o Xvid.' },
  { id: 'h264', cat: 'joint', name: 'H.264 / AVC', start: 2003, end: 2007, desc: 'El estándar más ubicuo. Pilar del auge de YouTube, Netflix y Blu-ray.' },
  { id: 'vc1', cat: 'smpte', name: 'VC-1', start: 2006, end: 2008, desc: 'Desarrollado por Microsoft. Compitió con H.264 en los primeros reproductores Blu-ray.' },
  { id: 'avs1', cat: 'avs', name: 'AVS-China', start: 2006, end: 2009, desc: 'Estándar nacional impulsado por China para reducir dependencia de licencias externas.' },
  { id: 'vp8', cat: 'google', name: 'VP8', start: 2010, end: 2013, desc: 'Google liberó este códec como código abierto para crear un estándar sin pago de licencias.' },
  { id: 'hevc', cat: 'joint', name: 'H.265 / HEVC', start: 2013, end: 2017, desc: 'Redujo el peso de archivos a la mitad, permitiendo streaming 4K y HDR.' },
  { id: 'vp9', cat: 'google', name: 'VP9', start: 2013, end: 2017, desc: 'Respuesta gratuita de Google a HEVC, adoptado masivamente por YouTube.' },
  { id: 'av1', cat: 'aomedia', name: 'AV1', start: 2018, end: 2026, desc: 'Diseñado para ser totalmente libre de regalías. Superó en eficiencia a VP9 y HEVC.' },
  { id: 'avs3', cat: 'avs', name: 'AVS3', start: 2019, end: 2024, desc: 'Estándar nacional en China optimizado para transmisiones en 8K.' },
  { id: 'vvc', cat: 'joint', name: 'H.266 / VVC', start: 2020, end: 2026, desc: 'Sucesor de HEVC, diseñado para 8K, VR y tasas de refresco altísimas.' },
  { id: 'evc', cat: 'iso', name: 'MPEG-5 EVC/LCEVC', start: 2020, end: 2025, desc: 'Alternativas flexibles con modelos de licencias simplificados.' }
];

const eras: HistoricalEra[] = [
  { name: 'Era SD/HD y Discos Ópticos', start: 1992, end: 2008, color: 'bg-slate-200/40' },
  { name: 'La Era del 4K y la Eficiencia', start: 2010, end: 2016, color: 'bg-sky-100/50' },
  { name: 'La Nueva Generación 8K y VR', start: 2020, end: 2026, color: 'bg-fuchsia-100/40' }
];

export default function VideoTimelineApp() {
  const [selectedStd, setSelectedStd] = useState<VideoStandard | undefined>(standards.find(s => s.id === 'vvc'));
  
  const timelineStart = 1982;
  const timelineEnd = 2028;
  const totalYears = timelineEnd - timelineStart;

  const getStyleForBlock = (startYear: number, endYear: number) => {
    const left = ((startYear - timelineStart) / totalYears) * 100;
    const width = ((endYear - startYear) / totalYears) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  const yearMarkers: number[] = [];
  for (let y = timelineStart; y <= timelineEnd; y += 5) {
    if (y >= 1985 && y <= 2025) yearMarkers.push(y);
  }

  return (
    <div className="flex flex-col h-screen bg-white font-sans overflow-hidden text-slate-900">
      
      {/* CABECERA */}
      <header className="bg-slate-900 text-white p-4 lg:px-6 shadow-md z-20 flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <MonitorPlay className="text-teal-400" />
            Cronología de Estándares de Video
          </h1>
          <p className="text-slate-400 text-sm mt-1">Evolución técnica desde 1984 hasta la era 8K/VR</p>
        </div>
      </header>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* LÍNEA DE TIEMPO (CONTENIDO DINÁMICO) */}
        <main className="flex-1 overflow-auto flex relative bg-slate-50 custom-scrollbar">
          
          {/* EJE Y: Organizaciones */}
          <div className="sticky left-0 bg-white/95 backdrop-blur z-30 border-r border-slate-200 shadow-[2px_0_10px_rgba(0,0,0,0.05)] w-32 md:w-48 flex-shrink-0 flex flex-col pt-12">
             <div className="h-full flex flex-col relative">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex-1 min-h-[60px] flex items-center px-2 md:px-4 border-b border-slate-100">
                    <span className="font-bold text-[10px] md:text-xs text-slate-700 leading-tight uppercase tracking-tighter">
                      {cat.name}
                    </span>
                  </div>
                ))}
             </div>
          </div>

          {/* GRID DE TIEMPO */}
          <div className="relative min-w-[1200px] flex-1 flex flex-col pt-12">
            
            {/* Etiquetas de años */}
            <div className="absolute top-0 left-0 w-full h-12 flex items-end pb-2 border-b border-slate-300 z-10 bg-slate-50/90 backdrop-blur">
              {yearMarkers.map(year => (
                <div key={`top-${year}`} className="absolute text-xs font-bold text-slate-400 -translate-x-1/2" style={{ left: `${((year - timelineStart) / totalYears) * 100}%` }}>
                  {year}
                </div>
              ))}
            </div>

            {/* Zonas de Eras */}
            {eras.map((era, i) => (
               <div key={i} className={`absolute top-12 bottom-0 ${era.color} border-l border-r border-white/40 z-0 pointer-events-none flex items-start justify-center pt-2`} style={getStyleForBlock(era.start, era.end)}>
                  <span className="text-[10px] font-bold text-slate-500/50 uppercase tracking-[0.2em] text-center px-2">
                    {era.name}
                  </span>
               </div>
            ))}

            {/* Cuadrícula vertical */}
            {yearMarkers.map(year => (
              <div key={`grid-${year}`} className="absolute top-12 bottom-0 border-l border-dashed border-slate-300 z-0 pointer-events-none" style={{ left: `${((year - timelineStart) / totalYears) * 100}%` }}></div>
            ))}

            {/* Renderizado de Bloques por Organización */}
            <div className="h-full flex flex-col relative z-10">
              {categories.map((cat) => (
                <div key={`row-${cat.id}`} className="flex-1 min-h-[60px] relative border-b border-slate-100/50 hover:bg-slate-200/20 transition-colors">
                  {standards.filter(s => s.cat === cat.id).map((std) => (
                    <button
                      key={std.id}
                      onClick={() => setSelectedStd(std)}
                      className={`absolute top-1/2 -translate-y-1/2 h-10 md:h-12 rounded shadow-sm 
                                flex items-center justify-center font-bold text-[10px] md:text-xs px-2
                                transition-all duration-200 hover:scale-[1.03] hover:z-20
                                ${cat.color} ${cat.border} border-b-4
                                ${selectedStd?.id === std.id ? 'ring-2 ring-black ring-offset-1 z-20 scale-105' : 'opacity-90'}
                              `}
                      style={getStyleForBlock(std.start, std.end)}
                    >
                      <span className="truncate">{std.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* SIDEBAR: Detalle Informativo */}
        {selectedStd && (
          <aside className="w-full md:w-80 lg:w-[400px] bg-white border-l border-slate-200 shadow-xl flex flex-col z-40 flex-shrink-0">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Ficha Técnica</h2>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                 {categories.find(c => c.id === selectedStd.cat)?.name}
               </div>
               
               <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">{selectedStd.name}</h3>
               
               <div className="flex flex-wrap gap-2 mb-6">
                 <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded">
                   {selectedStd.start} — {selectedStd.end > 2025 ? 'ACTUALIDAD' : selectedStd.end}
                 </span>
                 {['vp8', 'vp9', 'av1'].includes(selectedStd.id) && (
                   <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded flex items-center gap-1">
                     <Zap size={12} /> CÓDIGO ABIERTO
                   </span>
                 )}
               </div>

               <div className="text-slate-600 text-lg leading-relaxed mb-8">
                 {selectedStd.desc}
               </div>

               <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                 <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Importancia Histórica</h4>
                 <p className="text-sm text-slate-700 italic leading-snug">
                   {selectedStd.start >= 2018 
                     ? "Representa la era de la compresión ultra-eficiente para resoluciones extremas y nuevos formatos inmersivos."
                     : selectedStd.start >= 2010 
                     ? "Fue clave en la democratización del 4K y la lucha entre estándares de pago y gratuitos."
                     : "Sentó las bases de la infraestructura digital que permitió el paso de lo analógico a lo digital."}
                 </p>
               </div>
            </div>
          </aside>
        )}

      </div>
      
      {/* ESTILOS DE SCROLLBAR PERSONALIZADOS */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}