import React, { useState } from 'react';
import { PHOTO_SCREENS } from '../data/festivalData';
import { soundFx } from '../utils/soundEffects';

interface ScreensGalleryProps {
  onSelectScreenForTour: (stageIndex: number) => void;
}

export const ScreensGallery: React.FC<ScreensGalleryProps> = ({ onSelectScreenForTour }) => {
  const [selectedScreenId, setSelectedScreenId] = useState<string>(PHOTO_SCREENS[0].id);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);

  const activeScreen = PHOTO_SCREENS.find((s) => s.id === selectedScreenId) || PHOTO_SCREENS[0];

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#111319] p-4 sm:p-6 lg:p-10 text-[#e2e2eb]">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#45464f]/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#ce0217]"></span>
            <span className="font-space text-xs uppercase tracking-widest text-[#ffb4ab] font-bold">
              Registro Fotogramétrico y Perspectivas
            </span>
          </div>
          <h1 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#e2e2eb]">
            Pantallas y Ángulos de Inspección
          </h1>
          <p className="text-xs sm:text-sm text-[#c6c5d0] mt-1 max-w-2xl">
            Inspecciona cada una de las tomas y elevaciones capturadas durante el montaje y celebración del Festival de la Cajeta Celaya 2026.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const stageIndex = PHOTO_SCREENS.findIndex((s) => s.id === selectedScreenId);
              onSelectScreenForTour(stageIndex >= 0 ? stageIndex : 0);
              soundFx.playClick(800);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e2b58] text-[#b8c4fb] hover:bg-[#212e5b] hover:text-[#ffffff] border border-[#b8c4fb]/30 font-space text-xs font-semibold transition-all shadow-[0_0_16px_rgba(30,43,88,0.4)]"
          >
            <span className="material-symbols-outlined text-[18px]">3d_rotation</span>
            <span>Ver esta perspectiva en Tour 3D</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Big Theater View + Thumbnail List */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left / Top: Active Theater Image View */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0c0e14] border border-[#45464f]/40 shadow-2xl group">
            <img
              src={activeScreen.imageUrl}
              alt={activeScreen.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-80 pointer-events-none"></div>

            {/* Floating Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-[#191b22]/90 backdrop-blur-md border border-[#45464f]/40 font-space text-xs font-bold text-[#e2e2eb]">
                {activeScreen.badge}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-[#1e2b58]/80 backdrop-blur-md border border-[#b8c4fb]/30 font-mono text-[11px] text-[#b8c4fb]">
                Alt: {activeScreen.elevation}
              </span>
            </div>

            {/* Expand Fullscreen Button */}
            <button
              onClick={() => {
                setIsZoomModalOpen(true);
                soundFx.playClick();
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#191b22]/80 hover:bg-[#282a30] text-[#e2e2eb] border border-[#45464f]/40 flex items-center justify-center transition-all shadow-lg"
              title="Ver imagen completa en alta resolución"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_in</span>
            </button>

            {/* Bottom Overlay Info in Theater View */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#191b22]/90 backdrop-blur-xl border border-[#45464f]/30">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-space text-lg sm:text-xl font-bold text-[#e2e2eb]">
                  {activeScreen.title}
                </h3>
                <span className="font-space text-xs font-semibold px-2 py-0.5 rounded bg-[#33343b] text-[#ffdcd8]">
                  Área: {activeScreen.coverage}
                </span>
              </div>
              <p className="text-xs text-[#c6c5d0] mt-1.5 line-clamp-2">
                {activeScreen.description}
              </p>
            </div>
          </div>

          {/* Technical Points of This Angle */}
          <div className="bg-[#191b22]/90 p-5 rounded-2xl border border-[#45464f]/30 shadow-lg">
            <h4 className="font-space text-sm font-bold text-[#b8c4fb] uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              Elementos Destacados de esta Toma
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeScreen.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#1e1f26] border border-[#45464f]/20">
                  <span className="w-5 h-5 rounded-full bg-[#1e2b58] text-[#b8c4fb] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-xs text-[#c6c5d0] leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right / Bottom: Thumbnails & Angle Selection List */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <h3 className="font-space text-xs font-bold uppercase tracking-wider text-[#c6c5d0] px-1">
            Selecciona una Pantalla ({PHOTO_SCREENS.length} disponibles)
          </h3>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {PHOTO_SCREENS.map((screen, idx) => {
              const isSelected = screen.id === selectedScreenId;
              return (
                <div
                  key={screen.id}
                  onClick={() => {
                    setSelectedScreenId(screen.id);
                    soundFx.playClick(600 + idx * 60);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-center ${
                    isSelected
                      ? 'bg-[#1e2b58]/40 border-[#b8c4fb]/50 shadow-[0_0_20px_rgba(30,43,88,0.5)]'
                      : 'bg-[#191b22]/80 border-[#45464f]/30 hover:border-[#45464f]/70 hover:bg-[#1e1f26]'
                  }`}
                >
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#0c0e14] shrink-0 border border-[#45464f]/30 relative">
                    <img
                      src={screen.imageUrl}
                      alt={screen.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 font-mono text-[9px] text-[#b8c4fb]">
                      {screen.elevation}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-space text-[10px] uppercase font-bold text-[#ffb4ab]">
                        {screen.badge}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#ce0217] animate-pulse"></span>
                      )}
                    </div>
                    <span className="font-space text-xs font-bold text-[#e2e2eb] truncate mt-0.5">
                      {screen.title}
                    </span>
                    <span className="text-[11px] text-[#c6c5d0] truncate mt-0.5">
                      {screen.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* High-Resolution Zoom Modal */}
      {isZoomModalOpen && (
        <div
          onClick={() => setIsZoomModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-[#282a30] text-[#e2e2eb] hover:bg-[#33343b] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <img
              src={activeScreen.imageUrl}
              alt={activeScreen.title}
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-[#45464f]/40 shadow-2xl"
            />
            <div className="mt-3 text-center">
              <h4 className="font-space text-base font-bold text-[#e2e2eb]">{activeScreen.title}</h4>
              <p className="text-xs text-[#c6c5d0]">{activeScreen.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
