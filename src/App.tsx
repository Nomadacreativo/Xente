import { useState } from 'react';
import { Header } from './components/Header';
import { SpatialTour } from './components/SpatialTour';
import { ScreensGallery } from './components/ScreensGallery';
import { GoogleMapView } from './components/GoogleMapView';
import { TechnicalSpecsModal } from './components/TechnicalSpecsModal';
import { ArtisanGuide } from './components/ArtisanGuide';
import { Footer } from './components/Footer';

export default function App() {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [activeScreenMode, setActiveScreenMode] = useState<'tour' | 'gallery' | 'map' | 'specs' | 'artisan'>('tour');
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen bg-[#111319] text-[#e2e2eb] font-sans flex flex-col selection:bg-[#ce0217] selection:text-[#ffffff]">
      {/* Top Application Header */}
      <Header
        currentStageIndex={currentStageIndex}
        onSelectStage={(idx) => setCurrentStageIndex(idx)}
        activeScreenMode={activeScreenMode}
        onSelectScreenMode={(mode) => {
          if (mode === 'specs') {
            setIsSpecsModalOpen(true);
          } else {
            setActiveScreenMode(mode);
          }
        }}
        onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
      />

      {/* Main Viewport Area */}
      <main className="w-full pt-20 flex-1 relative flex flex-col">
        {activeScreenMode === 'tour' && (
          <SpatialTour
            currentStageIndex={currentStageIndex}
            onStageChange={(idx) => setCurrentStageIndex(idx)}
            onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
            onOpenMapView={() => setActiveScreenMode('map')}
          />
        )}

        {activeScreenMode === 'gallery' && (
          <ScreensGallery
            onSelectScreenForTour={(stageIdx) => {
              setCurrentStageIndex(stageIdx);
              setActiveScreenMode('tour');
            }}
          />
        )}

        {activeScreenMode === 'map' && (
          <GoogleMapView
            onGoToTourStage={(stageIdx) => {
              setCurrentStageIndex(stageIdx);
              setActiveScreenMode('tour');
            }}
          />
        )}

        {activeScreenMode === 'artisan' && (
          <ArtisanGuide
            onGoToProducerStage={() => {
              setCurrentStageIndex(3); // Stage 4: Pabellón de Productores
              setActiveScreenMode('tour');
            }}
          />
        )}
      </main>

      {/* Engineering Technical Specs Dossier Modal */}
      <TechnicalSpecsModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
