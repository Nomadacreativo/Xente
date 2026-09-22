import React, { useState } from 'react';
import { XENTE_SPECS, ASSETS } from '../data/festivalData';
import { soundFx } from '../utils/soundEffects';

interface TechnicalSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalSpecsModal: React.FC<TechnicalSpecsModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadSpecs = () => {
    soundFx.playClick(900);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);

    // Generate a formatted engineering text summary download
    const content = `=====================================================
FICHA TÉCNICA OFICIAL • INGENIERÍA FERIAL XENTE
FESTIVAL DE LA CAJETA CELAYA 2026
=====================================================
EMPRESA: ${XENTE_SPECS.company}
DIVISIÓN: ${XENTE_SPECS.division}
UBICACIÓN: ${XENTE_SPECS.location}

1. DIMENSIONES Y SUPERFICIE:
- Claro Libre: ${XENTE_SPECS.dimensions.clearSpan}
- Longitud Total: ${XENTE_SPECS.dimensions.totalLength}
- Área Cubierta: ${XENTE_SPECS.dimensions.totalArea}
- Altura a Cumbrera: ${XENTE_SPECS.dimensions.peakHeight}
- Altura a Hombros: ${XENTE_SPECS.dimensions.eaveHeight}

2. MEMBRANA Y LONA ESTRUCTURAL:
- Tipo: ${XENTE_SPECS.membrane.type}
- Gramaje: ${XENTE_SPECS.membrane.weight}
- Tratamiento: ${XENTE_SPECS.membrane.treatment}
- Resistencia al Fuego: ${XENTE_SPECS.membrane.fireRating}

3. INGENIERÍA ESTRUCTURAL:
- Perfilería: ${XENTE_SPECS.structuralSystem.profiles}
- Uniones: ${XENTE_SPECS.structuralSystem.connections}
- Anclaje: ${XENTE_SPECS.structuralSystem.anchoring}
- Carga de Viento: ${XENTE_SPECS.structuralSystem.windRating}

4. PROTECCIÓN CIVIL Y SEGURIDAD:
- Aforo Certificado: ${XENTE_SPECS.safetyAndLogistics.capacity}
- Salidas de Emergencia: ${XENTE_SPECS.safetyAndLogistics.exits}
- Red Eléctrica: ${XENTE_SPECS.safetyAndLogistics.electrical}
- Iluminación: ${XENTE_SPECS.safetyAndLogistics.lighting}
- Dictamen: ${XENTE_SPECS.safetyAndLogistics.inspection}

Validado por: Colegio de Ingenieros Civiles y Protección Civil Celaya 2026.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ficha_Tecnica_Encarpado_Xente_Celaya_2026.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#191b22] border border-[#45464f]/40 rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#111319] border-b border-[#45464f]/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1e2b58] border border-[#b8c4fb]/30 flex items-center justify-center">
              <img
                src={ASSETS.logoMark}
                alt="Xente"
                className="h-7 w-auto object-contain filter brightness-110"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-space text-lg sm:text-xl font-bold text-[#e2e2eb]">
                  Memoria Técnica y Estructural
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#ce0217]/20 text-[#ffb4ab] border border-[#ffb4ab]/30">
                  Certificado DRO
                </span>
              </div>
              <p className="text-xs text-[#c6c5d0]">
                Encarpado Monumental de 2,400 m² • Festival de la Cajeta Celaya 2026
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              soundFx.playClick();
            }}
            className="w-9 h-9 rounded-full bg-[#282a30] text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#33343b] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-[#c6c5d0] text-xs sm:text-sm">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#1e1f26] border border-[#45464f]/30 flex flex-col">
              <span className="font-space text-[10px] text-[#c6c5d0] uppercase tracking-wider">Claro Libre</span>
              <span className="font-space text-xl sm:text-2xl font-bold text-[#b8c4fb] mt-1">24.0 m</span>
              <span className="text-[10px] text-[#8793c7] mt-0.5">Sin postes intermedios</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1e1f26] border border-[#45464f]/30 flex flex-col">
              <span className="font-space text-[10px] text-[#c6c5d0] uppercase tracking-wider">Superficie</span>
              <span className="font-space text-xl sm:text-2xl font-bold text-[#e2e2eb] mt-1">2,400 m²</span>
              <span className="text-[10px] text-[#8793c7] mt-0.5">100m fondo x 24m frente</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1e1f26] border border-[#45464f]/30 flex flex-col">
              <span className="font-space text-[10px] text-[#c6c5d0] uppercase tracking-wider">Carga Eólica</span>
              <span className="font-space text-xl sm:text-2xl font-bold text-[#ffb4ab] mt-1">110 km/h</span>
              <span className="text-[10px] text-[#ffdad6] mt-0.5">Norma NMX-C-450</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1e1f26] border border-[#45464f]/30 flex flex-col">
              <span className="font-space text-[10px] text-[#c6c5d0] uppercase tracking-wider">Aforo Máximo</span>
              <span className="font-space text-xl sm:text-2xl font-bold text-[#ffdcd8] mt-1">4,500 pax</span>
              <span className="text-[10px] text-[#ffdad6] mt-0.5">Protección Civil OK</span>
            </div>
          </div>

          {/* Detailed Engineering Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Estructura y Perfiles */}
            <div className="p-4 rounded-2xl bg-[#1e1f26]/70 border border-[#45464f]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#b8c4fb]">
                <span className="material-symbols-outlined text-lg">view_in_ar</span>
                <h3 className="font-space text-sm font-bold text-[#e2e2eb] uppercase tracking-wide">
                  Ingeniería Estructural
                </h3>
              </div>
              <ul className="space-y-2 pt-1 text-xs text-[#c6c5d0]">
                <li><strong className="text-[#e2e2eb]">Aleación:</strong> {XENTE_SPECS.structuralSystem.profiles}</li>
                <li><strong className="text-[#e2e2eb]">Conectores:</strong> {XENTE_SPECS.structuralSystem.connections}</li>
                <li><strong className="text-[#e2e2eb]">Anclajes:</strong> {XENTE_SPECS.structuralSystem.anchoring}</li>
                <li><strong className="text-[#e2e2eb]">Garantía eólica:</strong> {XENTE_SPECS.structuralSystem.windRating}</li>
              </ul>
            </div>

            {/* Section 2: Membrana Textil */}
            <div className="p-4 rounded-2xl bg-[#1e1f26]/70 border border-[#45464f]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#ffb4ab]">
                <span className="material-symbols-outlined text-lg">shield</span>
                <h3 className="font-space text-sm font-bold text-[#e2e2eb] uppercase tracking-wide">
                  Membrana y Aislamiento
                </h3>
              </div>
              <ul className="space-y-2 pt-1 text-xs text-[#c6c5d0]">
                <li><strong className="text-[#e2e2eb]">Material:</strong> {XENTE_SPECS.membrane.type}</li>
                <li><strong className="text-[#e2e2eb]">Densidad:</strong> {XENTE_SPECS.membrane.weight}</li>
                <li><strong className="text-[#e2e2eb]">Tratamiento Térmico:</strong> {XENTE_SPECS.membrane.treatment}</li>
                <li><strong className="text-[#e2e2eb]">Norma Fuego:</strong> {XENTE_SPECS.membrane.fireRating}</li>
              </ul>
            </div>

            {/* Section 3: Red Eléctrica e Iluminación */}
            <div className="p-4 rounded-2xl bg-[#1e1f26]/70 border border-[#45464f]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#ffdcd8]">
                <span className="material-symbols-outlined text-lg">bolt</span>
                <h3 className="font-space text-sm font-bold text-[#e2e2eb] uppercase tracking-wide">
                  Instalación Eléctrica Ferial
                </h3>
              </div>
              <ul className="space-y-2 pt-1 text-xs text-[#c6c5d0]">
                <li><strong className="text-[#e2e2eb]">Alimentación:</strong> {XENTE_SPECS.safetyAndLogistics.electrical}</li>
                <li><strong className="text-[#e2e2eb]">Cielo Iluminado:</strong> {XENTE_SPECS.safetyAndLogistics.lighting}</li>
                <li><strong className="text-[#e2e2eb]">Tierras Físicas:</strong> Varillas cooperweld certificadas a tierra para puestos</li>
                <li><strong className="text-[#e2e2eb]">Tableros:</strong> Grado intemperie NEMA 4 con pastillas termomagnéticas</li>
              </ul>
            </div>

            {/* Section 4: Protección Civil y Evacuación */}
            <div className="p-4 rounded-2xl bg-[#1e1f26]/70 border border-[#45464f]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#b8c4fb]">
                <span className="material-symbols-outlined text-lg">emergency</span>
                <h3 className="font-space text-sm font-bold text-[#e2e2eb] uppercase tracking-wide">
                  Seguridad y Protección Civil
                </h3>
              </div>
              <ul className="space-y-2 pt-1 text-xs text-[#c6c5d0]">
                <li><strong className="text-[#e2e2eb]">Rutas de Salida:</strong> {XENTE_SPECS.safetyAndLogistics.exits}</li>
                <li><strong className="text-[#e2e2eb]">Extintores:</strong> Puntos de extintores PQS 6kg y Tipo K (especial para fogones)</li>
                <li><strong className="text-[#e2e2eb]">Desalojo:</strong> Tiempo de evacuación estimado menor a 3 minutos</li>
                <li><strong className="text-[#e2e2eb]">Dictamen:</strong> {XENTE_SPECS.safetyAndLogistics.inspection}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#111319] border-t border-[#45464f]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#c6c5d0] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Documento certificado por Xente Soluciones Integrales © 2026</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#282a30] text-[#c6c5d0] hover:text-[#e2e2eb] text-xs font-space font-medium"
            >
              Cerrar
            </button>
            <button
              onClick={handleDownloadSpecs}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e2b58] text-[#b8c4fb] hover:bg-[#212e5b] hover:text-[#ffffff] border border-[#b8c4fb]/40 font-space text-xs font-bold transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[17px]">
                {downloadSuccess ? 'check_circle' : 'download'}
              </span>
              <span>
                {downloadSuccess ? '¡Ficha Descargada!' : 'Descargar Dossier Completo (.txt)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
