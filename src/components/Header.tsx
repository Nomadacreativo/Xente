import React, { useState } from 'react';
import { ASSETS } from '../data/festivalData';
import { soundFx } from '../utils/soundEffects';

interface HeaderProps {
  currentStageIndex: number;
  onSelectStage: (index: number) => void;
  activeScreenMode: 'tour' | 'gallery' | 'map' | 'specs' | 'artisan';
  onSelectScreenMode: (mode: 'tour' | 'gallery' | 'map' | 'specs' | 'artisan') => void;
  onOpenSpecsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStageIndex,
  onSelectStage,
  activeScreenMode,
  onSelectScreenMode,
  onOpenSpecsModal,
}) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [logoError, setLogoError] = useState<boolean>(false);

  const toggleSound = () => {
    const isNowPlaying = soundFx.toggleMute();
    setIsAudioActive(isNowPlaying);
    soundFx.playClick(isNowPlaying ? 800 : 400);
  };

  const toggleFullscreen = () => {
    soundFx.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111319]/90 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border-b border-[#45464f]/30">
      <div className="h-20 w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Festival Identity */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <div 
            onClick={() => {
              onSelectScreenMode('tour');
              soundFx.playClick();
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center bg-[#282a30]/60 p-1.5 rounded-xl border border-[#45464f]/40 group-hover:border-[#b8c4fb]/50 transition-all">
              {!logoError ? (
                <img
                  src={ASSETS.logoMark}
                  alt="Xente Soluciones Integrales"
                  className="h-7 w-auto object-contain filter brightness-110"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="h-7 w-8 flex items-center justify-center font-bold text-base font-space">
                  <span className="text-[#ce0217]">X</span>
                  <span className="text-[#b8c4fb]">E</span>
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#ce0217] rounded-full ring-2 ring-[#111319]"></span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-space text-lg font-bold tracking-tight text-[#e2e2eb] uppercase">
                  Xente
                </span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#1e2b58] text-[#8793c7] font-semibold tracking-wider border border-[#b8c4fb]/20">
                  Soluciones
                </span>
              </div>
              <span className="text-[9px] text-[#c6c5d0] tracking-widest uppercase font-mono">
                Ingeniería Ferial
              </span>
            </div>
          </div>

          <div className="hidden xl:block h-8 w-px bg-[#45464f]/40"></div>

          {/* Festival Title and Stage Badge */}
          <div className="hidden lg:flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-bold text-[#e2e2eb] tracking-tight">
                Festival de la cajeta Celaya 2026
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ce0217]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 text-[10px] font-space font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
                TOUR VIRTUAL 3D
              </span>
            </div>
            <span className="text-xs text-[#c6c5d0]">
              Vuelo Inmersivo de Aproximación • Encarpado Monumental 2,400 m²
            </span>
          </div>
        </div>

        {/* Screen Mode Tabs & Viewpoints */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Main Navigation Modes */}
          <nav className="flex items-center gap-1 bg-[#0c0e14]/80 p-1 rounded-xl border border-[#45464f]/40 shrink-0">
            <button
              onClick={() => {
                onSelectScreenMode('tour');
                soundFx.playClick();
              }}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-space font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeScreenMode === 'tour'
                  ? 'bg-[#1e2b58] text-[#e2e2eb] shadow-[0_0_12px_rgba(30,43,88,0.6)] border border-[#b8c4fb]/30'
                  : 'text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#1e1f26]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#b8c4fb]">3d_rotation</span>
              <span className="hidden sm:inline">Tour 3D</span>
            </button>

            <button
              onClick={() => {
                onSelectScreenMode('gallery');
                soundFx.playClick();
              }}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-space font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeScreenMode === 'gallery'
                  ? 'bg-[#1e2b58] text-[#e2e2eb] shadow-[0_0_12px_rgba(30,43,88,0.6)] border border-[#b8c4fb]/30'
                  : 'text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#1e1f26]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffb4ab]">grid_view</span>
              <span className="hidden sm:inline">Pantallas</span>
            </button>

            <button
              onClick={() => {
                onSelectScreenMode('map');
                soundFx.playClick();
              }}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-space font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeScreenMode === 'map'
                  ? 'bg-[#1e2b58] text-[#e2e2eb] shadow-[0_0_12px_rgba(30,43,88,0.6)] border border-[#b8c4fb]/30'
                  : 'text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#1e1f26]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#a4c9ff]">map</span>
              <span className="hidden md:inline">Mapa GPS</span>
            </button>

            <button
              onClick={() => {
                onSelectScreenMode('artisan');
                soundFx.playClick();
              }}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-space font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeScreenMode === 'artisan'
                  ? 'bg-[#1e2b58] text-[#e2e2eb] shadow-[0_0_12px_rgba(30,43,88,0.6)] border border-[#b8c4fb]/30'
                  : 'text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#1e1f26]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffdcd8]">bakery_dining</span>
              <span className="hidden lg:inline">Cajeta Celaya</span>
            </button>
          </nav>

          {/* If on tour, show quick scene selector on large desktop */}
          {activeScreenMode === 'tour' && (
            <div className="hidden 2xl:flex items-center gap-1 bg-[#0c0e14]/80 p-1 rounded-xl border border-[#45464f]/30 shrink-0">
              {[
                { label: "01 Aérea", stage: 0 },
                { label: "02 Acceso", stage: 1 },
                { label: "03 Pasillo", stage: 2 },
                { label: "04 Productores", stage: 3 }
              ].map(item => (
                <button
                  key={item.stage}
                  onClick={() => {
                    onSelectStage(item.stage);
                    soundFx.playStageTransition(item.stage + 1);
                  }}
                  className={`px-2.5 py-1 text-xs font-space font-medium rounded-lg transition-all whitespace-nowrap ${
                    currentStageIndex === item.stage
                      ? 'bg-[#1e2b58] text-[#e2e2eb] shadow-sm font-semibold'
                      : 'text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#282a30]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#282a30]/80 border border-[#45464f]/40 flex items-center justify-center transition-all ${
              isAudioActive
                ? 'text-[#ffb4ab] border-[#ffb4ab]/40 bg-[#1e2b58]/50 shadow-[0_0_12px_rgba(255,180,171,0.3)]'
                : 'text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#33343b]'
            }`}
            title={isAudioActive ? "Silenciar audio ambiental" : "Activar audio ambiental espacial"}
          >
            <span className="material-symbols-outlined text-[17px] sm:text-[19px]">
              {isAudioActive ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#282a30]/80 border border-[#45464f]/40 flex items-center justify-center text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#33343b] transition-all"
            title="Pantalla Completa"
          >
            <span className="material-symbols-outlined text-[17px] sm:text-[19px]">fullscreen</span>
          </button>

          {/* Technical Specs Trigger */}
          <button
            onClick={() => {
              onOpenSpecsModal();
              soundFx.playClick(700);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#1e2b58] text-[#b8c4fb] hover:bg-[#212e5b] hover:text-[#ffffff] border border-[#b8c4fb]/40 text-xs font-space font-semibold transition-all shadow-[0_0_16px_rgba(30,43,88,0.4)]"
            title="Ver Ficha Técnica Xente"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[17px]">architecture</span>
            <span className="hidden sm:inline">Ficha Técnica</span>
          </button>
        </div>
      </div>
    </header>
  );
};
