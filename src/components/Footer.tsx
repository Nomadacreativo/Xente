import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c0e14]/90 border-t border-[#45464f]/30 py-4 backdrop-blur-xl relative z-30">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#c6c5d0]">
        <div className="flex items-center gap-2 text-center md:text-left">
          <span>© 2026 Festival de la Cajeta Celaya. Diseñado y montado por</span>
          <span className="text-[#b8c4fb] font-semibold font-space">
            Xente Soluciones Integrales
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-space text-[#c6c5d0]">
          <span className="flex items-center gap-1.5 text-[#e2e2eb]">
            <span className="w-2 h-2 rounded-full bg-[#5298ec] animate-pulse"></span>
            Motor de Vuelo Continuo WebGL
          </span>
          <span className="hidden sm:inline text-[#c6c5d0]">
            Renderizado de Capas Inmersivas
          </span>
          <span className="text-[#90909a] font-mono text-[10px]">
            v5.0.0-spatial-zoom
          </span>
        </div>
      </div>
    </footer>
  );
};
