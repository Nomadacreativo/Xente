import React, { useState } from 'react';
import { CAJETA_PRODUCERS } from '../data/festivalData';
import { soundFx } from '../utils/soundEffects';

interface ArtisanGuideProps {
  onGoToProducerStage: () => void;
}

export const ArtisanGuide: React.FC<ArtisanGuideProps> = ({ onGoToProducerStage }) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const flavorsList = ['todos', 'Quemada', 'Envinada', 'Vainilla', 'Nuez'];

  const filteredProducers = CAJETA_PRODUCERS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFlavor =
      selectedFlavor === 'todos' ||
      p.flavors.some((f) => f.toLowerCase().includes(selectedFlavor.toLowerCase()));

    return matchesSearch && matchesFlavor;
  });

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#111319] p-4 sm:p-6 lg:p-10 text-[#e2e2eb]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#191b22] via-[#1e2b58]/50 to-[#191b22] border border-[#45464f]/40 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ce0217]"></span>
              <span className="font-space text-xs uppercase tracking-widest text-[#ffb4ab] font-bold">
                Patrimonio Gastronómico de Guanajuato
              </span>
            </div>
            <h1 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#e2e2eb]">
              El Alma de Celaya: Tradición en Cazo de Cobre
            </h1>
            <p className="text-xs sm:text-sm text-[#c6c5d0] leading-relaxed">
              La cajeta de Celaya debe su nombre al original "cajete" de madera de tejamanil donde se envasaba. Elaborada 100% con leche de cabra fresca, hervida a fuego lento en cazos de cobre martillado y batida pacientemente con pala de madera de encino durante horas para lograr su textura inconfundible.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onGoToProducerStage();
                  soundFx.playClick();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ce0217] text-[#ffffff] hover:bg-[#a50212] font-space text-xs font-bold transition-all shadow-[0_0_16px_rgba(206,2,23,0.5)]"
              >
                <span className="material-symbols-outlined text-[17px]">storefront</span>
                <span>Explorar Stands en el Pabellón 3D</span>
              </button>
              <div className="text-xs text-[#ffdcd8] font-mono px-3 py-1.5 rounded-xl bg-[#0c0e14]/60 border border-[#45464f]/30">
                48 Fabricantes Oficiales Participantes
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Varieties Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#191b22] border border-[#45464f]/30 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#ce0217]/20 text-[#ffb4ab] flex items-center justify-center border border-[#ffb4ab]/30">
              <span className="material-symbols-outlined text-lg">local_fire_department</span>
            </div>
            <h3 className="font-space text-base font-bold text-[#e2e2eb]">Cajeta Quemada</h3>
            <p className="text-xs text-[#c6c5d0]">
              El clásico insuperable. Cocción prolongada que carameliza intensamente la leche hasta adquirir un tono caoba oscuro y un toque ahumado delicioso.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#191b22] border border-[#45464f]/30 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#1e2b58] text-[#b8c4fb] flex items-center justify-center border border-[#b8c4fb]/30">
              <span className="material-symbols-outlined text-lg">liquor</span>
            </div>
            <h3 className="font-space text-base font-bold text-[#e2e2eb]">Cajeta Envinada</h3>
            <p className="text-xs text-[#c6c5d0]">
              Perfumada con ron añejo, vino o jerez de barrica. El alcohol se evapora durante el hervor, dejando notas amaderadas y especiadas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#191b22] border border-[#45464f]/30 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#33343b] text-[#ffdcd8] flex items-center justify-center border border-[#ffdad6]/30">
              <span className="material-symbols-outlined text-lg">spa</span>
            </div>
            <h3 className="font-space text-base font-bold text-[#e2e2eb]">Cajeta de Vainilla</h3>
            <p className="text-xs text-[#c6c5d0]">
              Sabor suave y aterciopelado con extracto puro de vainas de vainilla de Papantla. La favorita de los niños y para postres finos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#191b22] border border-[#45464f]/30 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#282a30] text-[#a4c9ff] flex items-center justify-center border border-[#a4c9ff]/30">
              <span className="material-symbols-outlined text-lg">nature</span>
            </div>
            <h3 className="font-space text-base font-bold text-[#e2e2eb]">Con Nuez Pecana</h3>
            <p className="text-xs text-[#c6c5d0]">
              Trozos crocantes de nuez pecana del estado de Guanajuato tostadas al punto justo, incorporadas al final del batido.
            </p>
          </div>
        </div>

        {/* Producers Directory & Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-space text-xl font-bold text-[#e2e2eb]">
                Directorio de Fabricantes Tradicionales
              </h2>
              <p className="text-xs text-[#c6c5d0]">
                Ubicación exacta de stands dentro del Mega Encarpado Xente de 2,400 m²
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {flavorsList.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => {
                    setSelectedFlavor(flavor);
                    soundFx.playClick(650);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-space text-xs transition-all ${
                    selectedFlavor === flavor
                      ? 'bg-[#1e2b58] text-[#b8c4fb] font-semibold border border-[#b8c4fb]/40 shadow-sm'
                      : 'bg-[#191b22] text-[#c6c5d0] hover:text-[#e2e2eb] border border-[#45464f]/30'
                  }`}
                >
                  {flavor === 'todos' ? 'Todos los Sabores' : flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c6c5d0] text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por marca, sabor o especialidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#191b22] border border-[#45464f]/40 rounded-xl pl-9 pr-4 py-2 text-xs text-[#e2e2eb] focus:outline-none focus:border-[#b8c4fb]"
            />
          </div>

          {/* Producers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducers.map((prod) => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl bg-[#191b22] border border-[#45464f]/30 hover:border-[#b8c4fb]/40 transition-all flex flex-col justify-between gap-4 shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-space text-lg font-bold text-[#e2e2eb]">
                        {prod.name}
                      </h3>
                      <span className="text-[10px] text-[#ffb4ab] font-mono uppercase tracking-wider">
                        Fundada en {prod.founded} • Tradición Familiar
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-[#1e2b58] text-[#b8c4fb] font-space text-[10px] font-semibold border border-[#b8c4fb]/30 whitespace-nowrap">
                      {prod.standLocation}
                    </span>
                  </div>

                  <p className="text-xs text-[#c6c5d0] leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-1">
                    <span className="text-[10px] text-[#c6c5d0] uppercase font-bold tracking-wider block mb-1.5">
                      Sabores Insignia:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prod.flavors.map((flv, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-[#1e1f26] border border-[#45464f]/30 text-[11px] text-[#e2e2eb]"
                        >
                          {flv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#45464f]/30 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[#ffb4ab]">
                    <span className="material-symbols-outlined text-[16px]">military_tech</span>
                    <span className="text-[11px] font-medium">{prod.award}</span>
                  </div>
                  <button
                    onClick={() => {
                      onGoToProducerStage();
                      soundFx.playClick();
                    }}
                    className="text-[#b8c4fb] hover:underline font-space text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Ver en Tour</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
