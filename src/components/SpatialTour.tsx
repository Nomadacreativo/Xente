import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ASSETS, STAGES, HOTSPOTS } from '../data/festivalData';
import { soundFx } from '../utils/soundEffects';

interface SpatialTourProps {
  currentStageIndex: number;
  onStageChange: (index: number) => void;
  onOpenSpecsModal: () => void;
  onOpenMapView: () => void;
}

export const SpatialTour: React.FC<SpatialTourProps> = ({
  currentStageIndex,
  onStageChange,
  onOpenSpecsModal,
  onOpenMapView,
}) => {
  // Continuous flight progress from 0.0 (high aerial) to 1.0 (deep inside festival)
  const [flightProgress, setFlightProgress] = useState<number>(0.0);
  const targetProgressRef = useRef<number>(0.0);
  const currentProgressRef = useRef<number>(0.0);

  // Parallax mouse offsets
  const mouseXRef = useRef<number>(0);
  const mouseYRef = useRef<number>(0);
  const parallaxXRef = useRef<number>(0);
  const parallaxYRef = useRef<number>(0);

  // Time of day lighting: 0 (Day 10:00 AM) -> 0.5 (Sunset 18:30) -> 1.0 (Night 02:00 AM)
  const [timeOfDay, setTimeOfDay] = useState<number>(0.35); // Late afternoon

  // Zoom offset multiplier from side controls
  const [zoomMultiplier, setZoomMultiplier] = useState<number>(1.0);

  // Inspector Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);

  // Help Overlay state
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // DOM layer refs
  const layerAerialRef = useRef<HTMLDivElement>(null);
  const layerEntranceRef = useRef<HTMLDivElement>(null);
  const layerInteriorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Target stage mapping values: [0.0, 0.32, 0.68, 1.0]
  const stageTargets = [0.0, 0.32, 0.68, 1.0];

  // Helper clamp & lerp
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
  const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

  // Jump smoothly to a stage
  const jumpToStage = useCallback((index: number) => {
    const target = stageTargets[clamp(index, 0, 3)];
    targetProgressRef.current = target;
    soundFx.playStageTransition(index + 1);
  }, []);

  // Sync external stage prop changes
  useEffect(() => {
    const desiredTarget = stageTargets[currentStageIndex];
    if (Math.abs(targetProgressRef.current - desiredTarget) > 0.1) {
      targetProgressRef.current = desiredTarget;
    }
  }, [currentStageIndex]);

  // Main rendering loop for smooth continuous camera flight and parallax
  useEffect(() => {
    let lastReportedStage = currentStageIndex;

    const render = () => {
      // Smooth interpolation for flight progress
      currentProgressRef.current = lerp(currentProgressRef.current, targetProgressRef.current, 0.12);
      const p = currentProgressRef.current;

      // Parallax smooth interpolation
      parallaxXRef.current = lerp(parallaxXRef.current, mouseXRef.current * 18, 0.08);
      parallaxYRef.current = lerp(parallaxYRef.current, mouseYRef.current * 14, 0.08);

      const px = parallaxXRef.current;
      const py = parallaxYRef.current;
      const zoom = zoomMultiplier;

      // PHASE 1: Aerial View Layer (0.0 -> 0.40)
      if (layerAerialRef.current) {
        const scale = (1.0 + p * 1.8) * zoom;
        const opacity = clamp(1 - (p - 0.22) / 0.16, 0, 1);
        layerAerialRef.current.style.opacity = opacity.toString();
        layerAerialRef.current.style.transform = `scale(${scale}) translate3d(${px * 0.4}px, ${py * 0.4}px, 0)`;
      }

      // PHASE 2: Intermediate Entrance Layer (0.24 -> 0.74)
      if (layerEntranceRef.current) {
        let opacity = 0;
        if (p < 0.24) {
          opacity = 0;
        } else if (p < 0.42) {
          opacity = (p - 0.24) / 0.18;
        } else if (p < 0.65) {
          opacity = 1;
        } else {
          opacity = clamp(1 - (p - 0.65) / 0.18, 0, 1);
        }
        const scale = (0.85 + (p - 0.24) * 0.95) * zoom;
        const blur = (p > 0.58 && p < 0.78) ? ((p - 0.58) * 8) : 0;
        layerEntranceRef.current.style.opacity = opacity.toString();
        layerEntranceRef.current.style.filter = `blur(${blur}px)`;
        layerEntranceRef.current.style.transform = `scale(${scale}) translate3d(${px * 0.7}px, ${py * 0.7}px, 0)`;
      }

      // PHASE 3: Interior Festival Layer (0.58 -> 1.0)
      if (layerInteriorRef.current) {
        let opacity = 0;
        if (p < 0.58) {
          opacity = 0;
        } else {
          opacity = clamp((p - 0.58) / 0.20, 0, 1);
        }
        const scale = (0.88 + (p - 0.58) * 0.45) * zoom;
        layerInteriorRef.current.style.opacity = opacity.toString();
        layerInteriorRef.current.style.transform = `scale(${scale}) translate3d(${px}px, ${py}px, 0)`;
      }

      // Determine active stage index
      let activeIdx = 0;
      if (p < 0.28) {
        activeIdx = 0;
      } else if (p < 0.62) {
        activeIdx = 1;
      } else if (p < 0.85) {
        activeIdx = 2;
      } else {
        activeIdx = 3;
      }

      if (activeIdx !== lastReportedStage) {
        lastReportedStage = activeIdx;
        onStageChange(activeIdx);
      }

      setFlightProgress(p);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onStageChange, zoomMultiplier, currentStageIndex]);

  // Ambient Dust and Sparkle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
      hue: number;
    }> = [];

    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        hue: Math.random() > 0.5 ? 40 : 15 // golden or warm copper
      });
    }

    let particleAnim: number;
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      const p = currentProgressRef.current;

      particles.forEach((pt) => {
        pt.y += pt.speedY;
        pt.x += pt.speedX;
        if (pt.y < 0) pt.y = height;
        if (pt.x < 0) pt.x = width;
        if (pt.x > width) pt.x = 0;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${pt.hue}, 90%, 75%, ${pt.alpha * (0.3 + p * 0.7)})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(255, 180, 171, 0.7)';
        ctx.fill();
      });

      particleAnim = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(particleAnim);
    };
  }, []);

  // Wheel / Scroll event handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.0016;
    targetProgressRef.current = clamp(targetProgressRef.current + delta, 0, 1);
  };

  // Touch handlers for mobile
  const touchStartYRef = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const delta = (touchStartYRef.current - currentY) * 0.0035;
    touchStartYRef.current = currentY;
    targetProgressRef.current = clamp(targetProgressRef.current + delta, 0, 1);
  };

  // Mouse move handler for 3D parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseXRef.current = e.clientX / innerWidth - 0.5;
    mouseYRef.current = e.clientY / innerHeight - 0.5;
  };

  // Stepper handlers
  const handlePrevStep = () => {
    if (targetProgressRef.current > 0.70) targetProgressRef.current = 0.68;
    else if (targetProgressRef.current > 0.35) targetProgressRef.current = 0.32;
    else targetProgressRef.current = 0.0;
    soundFx.playClick(500);
  };

  const handleNextStep = () => {
    if (targetProgressRef.current < 0.30) targetProgressRef.current = 0.32;
    else if (targetProgressRef.current < 0.65) targetProgressRef.current = 0.68;
    else targetProgressRef.current = 1.0;
    soundFx.playClick(700);
  };

  // Camera zoom controls
  const handleZoomIn = () => {
    setZoomMultiplier((prev) => Math.min(prev + 0.15, 1.6));
    soundFx.playClick(850);
  };
  const handleZoomOut = () => {
    setZoomMultiplier((prev) => Math.max(prev - 0.15, 0.85));
    soundFx.playClick(650);
  };
  const handleResetCamera = () => {
    setZoomMultiplier(1.0);
    mouseXRef.current = 0;
    mouseYRef.current = 0;
    soundFx.playClick(550);
  };

  // Active Stage and Hotspot data
  const activeStage = STAGES[currentStageIndex];
  const activeHotspot = HOTSPOTS[currentStageIndex];

  // Telemetry metrics
  const currentAlt = lerp(48.0, 1.8, Math.pow(flightProgress, 0.85)).toFixed(1);
  const currentFov = Math.round(lerp(74, 62, flightProgress));
  const percentVal = Math.round(flightProgress * 100);

  // Time of Day ambient tinting filter
  // 0.0: Bright daylight | 0.5: Golden Sunset orange/rose | 1.0: Deep Night with warm festival lanterns
  const getLightingOverlay = () => {
    if (timeOfDay < 0.4) {
      return 'bg-amber-500/5 mix-blend-color';
    } else if (timeOfDay < 0.75) {
      return 'bg-gradient-to-t from-orange-950/40 via-red-900/20 to-purple-950/30 mix-blend-color-burn';
    } else {
      return 'bg-gradient-to-t from-[#0c0e14]/70 via-[#191b22]/40 to-transparent mix-blend-multiply';
    }
  };

  // Azimuth compass angle computation
  const compassAngle = Math.round(342 + parallaxXRef.current * 1.5);

  return (
    <div
      className="relative w-full h-[calc(100vh-5rem)] overflow-hidden select-none bg-[#0c0e14] perspective-stage cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseMove={handleMouseMove}
    >
      {/* Multi-layered Viewport Stage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Layer 1: Aerial Macro */}
        <div
          ref={layerAerialRef}
          className="camera-layer absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
          style={{ opacity: 1 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${ASSETS.layerAerial}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-[#0c0e14]/40"></div>
            <div className="absolute inset-0 bg-[#1e2b58]/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-black/15"></div>
          </div>
        </div>

        {/* Layer 2: Intermediate Entrance & Traditional Doll / Brick Oven */}
        <div
          ref={layerEntranceRef}
          className="camera-layer absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${ASSETS.layerEntranceElevated}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14]/80 via-transparent to-[#0c0e14]/30"></div>
            <div className="absolute inset-0 bg-[#ce0217]/5 mix-blend-soft-light"></div>
          </div>
        </div>

        {/* Layer 3: Interior Festival with Papel Picado & Producers */}
        <div
          ref={layerInteriorRef}
          className="camera-layer absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${ASSETS.layerInteriorAisle}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14]/90 via-transparent to-[#0c0e14]/40"></div>
            <div className="absolute inset-0 bg-[#b8c4fb]/5 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Time of Day Lighting Filter */}
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${getLightingOverlay()}`}></div>

        {/* Dynamic Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(17,19,25,0.85)] z-10"></div>

        {/* Depth Ambient Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" />
      </div>

      {/* Spatial Hotspots Placed in 3D Space */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {HOTSPOTS.map((spot, idx) => {
          const isVisible = idx === currentStageIndex;
          return (
            <div
              key={spot.id}
              onClick={() => {
                setSelectedHotspotId(spot.id);
                setIsDrawerOpen(true);
                soundFx.playClick(750);
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
              }`}
              style={{ top: spot.top, left: spot.left }}
            >
              {/* Concentric Pulsing Beacon Marker */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-9 h-9 rounded-full bg-[#ce0217]/40 animate-ping"></span>
                <span className="relative w-4 h-4 rounded-full bg-[#ce0217] shadow-[0_0_16px_rgba(206,2,23,0.9)] ring-2 ring-[#e2e2eb]"></span>
              </div>

              {/* Spatial Tooltip Pill */}
              <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-[#0c0e14]/90 border border-[#45464f]/50 backdrop-blur-xl shadow-2xl transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#ffb4ab]">
                  {spot.icon}
                </span>
                <span className="font-space text-xs font-semibold text-[#e2e2eb] whitespace-nowrap">
                  {spot.title}
                </span>
                <span className="text-[10px] text-[#8793c7] font-mono px-1 rounded bg-[#1e2b58]/60">
                  INFO
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* HUD Overlay Canvas Matrix */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 sm:p-6 lg:p-8 z-20">
        {/* Top HUD Header: Telemetry & Sponsor Specs Badge */}
        <div className="flex items-start justify-between w-full pointer-events-auto">
          {/* Left: Telemetry Box */}
          <div className="flex flex-col gap-1.5 bg-[#191b22]/90 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#45464f]/30 max-w-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ce0217] animate-ping"></span>
                <span className="font-space text-[11px] uppercase tracking-wider text-[#ffb4ab] font-bold">
                  Telemetría Espacial Xente
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e1f26] text-[#b8c4fb] font-bold">
                {activeStage.speedText}
              </span>
            </div>

            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="font-space text-2xl sm:text-3xl font-bold text-[#e2e2eb]">
                {activeStage.num}
              </span>
              <span className="font-space text-base sm:text-lg font-semibold text-[#b8c4fb] truncate">
                {activeStage.title}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1 text-[#c6c5d0] text-xs font-space">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#a4c9ff]">height</span>
                <span className="font-mono text-[#e2e2eb] font-semibold">Alt: {currentAlt} m</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#ffb4ab]">explore</span>
                <span className="font-mono text-[#ffb4ab] font-semibold">Inmersión: {percentVal}%</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#a4c9ff]">straighten</span>
                <span className="font-mono">FOV: {currentFov}°</span>
              </div>
            </div>
          </div>

          {/* Right: Engineered Sponsor & Structural Inspection Toggle */}
          <div className="hidden sm:flex flex-col items-end gap-2">
            <div className="flex items-center gap-2.5 bg-[#191b22]/90 backdrop-blur-2xl p-2 rounded-2xl shadow-2xl border border-[#45464f]/30">
              <img
                src={ASSETS.logoMark}
                alt="Xente Soluciones Integrales"
                className="h-8 w-auto px-1.5 object-contain filter brightness-110"
              />
              <div className="h-6 w-px bg-[#33343b]"></div>
              <div className="flex flex-col pr-2 text-right">
                <span className="font-space text-xs uppercase text-[#e2e2eb] font-bold">
                  Ingeniería Ferial
                </span>
                <span className="text-[9px] text-[#c6c5d0] font-mono">
                  Celaya 2026 • 2,400 m²
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsDrawerOpen(!isDrawerOpen);
                soundFx.playClick();
              }}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1f26]/90 hover:bg-[#282a30] border border-[#45464f]/40 backdrop-blur-xl text-[#e2e2eb] font-space text-xs shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-sm text-[#b8c4fb]">data_exploration</span>
              <span>Inspección Estructural</span>
              <span className="material-symbols-outlined text-xs">
                {isDrawerOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Center-Bottom Floating Tour Progression Hub & Continuous Inset Slider */}
        <div className="flex flex-col items-center gap-2 w-full pointer-events-auto pb-1 max-w-xl mx-auto">
          {/* Continuous Progression Drag Bar & Scroll Guide */}
          <div className="w-full flex flex-col gap-2 px-4 sm:px-6 py-2.5 rounded-2xl bg-[#191b22]/95 border border-[#45464f]/40 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-7 rounded-full bg-[#33343b] flex items-start justify-center p-0.5 border border-[#45464f]/30">
                  <div className="w-1 h-1.5 bg-[#ffb4ab] rounded-full animate-bounce"></div>
                </div>
                <span className="font-space text-[10px] sm:text-[11px] tracking-wider uppercase text-[#c6c5d0] font-bold hidden sm:inline">
                  Gira la Rueda / Haz Scroll o Arrastra
                </span>
                <span className="font-space text-[10px] tracking-wider uppercase text-[#c6c5d0] font-bold sm:hidden">
                  Desliza o Arrastra
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[#b8c4fb] font-bold text-xs">
                  Inmersión: {percentVal}%
                </span>
                <div className="h-3 w-px bg-[#45464f]/40"></div>

                {/* Prev & Next Stepper */}
                <button
                  onClick={handlePrevStep}
                  disabled={flightProgress <= 0.02}
                  className="w-7 h-7 rounded-full bg-[#1e1f26] hover:bg-[#1e2b58] text-[#e2e2eb] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Retroceder Fase"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </button>
                <span className="font-space text-xs text-[#e2e2eb] font-bold font-mono px-1">
                  {currentStageIndex + 1} / 4
                </span>
                <button
                  onClick={handleNextStep}
                  disabled={flightProgress >= 0.98}
                  className="w-7 h-7 rounded-full bg-[#1e1f26] hover:bg-[#1e2b58] text-[#e2e2eb] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Avanzar Fase"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Interactive Scrubbing Slider */}
            <div className="relative w-full flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={flightProgress}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  targetProgressRef.current = val;
                }}
                className="w-full h-2 bg-[#33343b] rounded-lg appearance-none cursor-pointer custom-range"
              />
              <div
                className="absolute left-0 top-0 bottom-0 pointer-events-none rounded-lg bg-gradient-to-r from-[#1e2b58] via-[#b8c4fb] to-[#ffb4ab] transition-all"
                style={{ width: `${percentVal}%` }}
              ></div>
            </div>
          </div>

          {/* Timeline Segment Bar Dock */}
          <div className="w-full flex items-center justify-between gap-1 p-1 rounded-2xl bg-[#0c0e14]/90 border border-[#45464f]/40 backdrop-blur-2xl shadow-2xl">
            {STAGES.map((stg, idx) => (
              <button
                key={stg.id}
                onClick={() => jumpToStage(idx)}
                className={`flex-1 py-1.5 sm:py-2 px-1 text-center rounded-xl font-space text-[11px] sm:text-xs transition-all ${
                  currentStageIndex === idx
                    ? 'bg-[#1e2b58] text-[#e2e2eb] font-bold shadow-md border border-[#b8c4fb]/30'
                    : 'text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#282a30]'
                }`}
              >
                <span className="block truncate">{stg.num} {stg.title.split(' ')[1] || stg.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Left: Compass Widget & Map Launcher */}
      <aside className="fixed top-24 left-4 pointer-events-auto z-40 hidden md:flex flex-col gap-2 bg-[#191b22]/90 backdrop-blur-xl p-2.5 rounded-2xl border border-[#45464f]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="w-12 h-12 rounded-full border border-[#45464f]/40 flex items-center justify-center relative bg-[#0c0e14]/80 mx-auto">
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#ce0217] transition-transform duration-150"
            style={{ transform: `rotate(${compassAngle}deg)` }}
          ></div>
          <div className="absolute top-1 text-[8px] font-space text-[#ffb4ab] font-bold">N</div>
          <div className="absolute w-8 h-8 rounded-full border border-[#b8c4fb]/30 border-dashed"></div>
        </div>
        <div className="text-center font-space text-[9px] text-[#c6c5d0] uppercase tracking-wider">
          Azim {compassAngle}°
        </div>
        <div className="h-px w-full bg-[#45464f]/30"></div>
        <button
          onClick={() => {
            onOpenMapView();
            soundFx.playClick(750);
          }}
          className="flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg bg-[#1e2b58]/80 hover:bg-[#1e2b58] text-[#b8c4fb] text-[10px] font-space font-semibold transition-all border border-[#b8c4fb]/30"
          title="Ver mapa GPS en Google Maps"
        >
          <span className="material-symbols-outlined text-[14px]">map</span>
          <span>GPS</span>
        </button>
      </aside>

      {/* Floating Bottom-Left: Interactive Time-of-Day Atmosphere Control */}
      <aside className="fixed bottom-6 left-4 pointer-events-auto z-30 hidden xl:flex flex-col gap-1.5 bg-[#191b22]/90 backdrop-blur-xl p-3 rounded-2xl border border-[#45464f]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-56">
        <div className="flex items-center justify-between text-[#c6c5d0] px-0.5">
          <span className="font-space text-xs uppercase tracking-wider text-[#b8c4fb] font-semibold">
            Atmósfera
          </span>
          <span className="font-space text-xs text-[#ffdcd8]">
            {timeOfDay < 0.4 ? 'Sol • 13:00' : timeOfDay < 0.75 ? 'Atardecer • 18:30' : 'Noche • 21:30'}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={timeOfDay}
          onChange={(e) => {
            setTimeOfDay(parseFloat(e.target.value));
            soundFx.playClick(400 + parseFloat(e.target.value) * 300);
          }}
          className="w-full h-2 bg-[#33343b] rounded-lg appearance-none cursor-pointer custom-range"
        />

        <div className="flex justify-between font-space text-[9px] text-[#c6c5d0] px-0.5">
          <span>10:00 AM</span>
          <span>02:00 AM</span>
        </div>
      </aside>

      {/* Floating Bottom-Right: Camera Navigation Controls Dock */}
      <aside className="fixed bottom-6 right-4 pointer-events-auto z-30 flex flex-col gap-2">
        <div className="flex flex-col rounded-2xl bg-[#191b22]/90 backdrop-blur-xl border border-[#45464f]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center text-[#e2e2eb] hover:bg-[#282a30] transition-colors"
            title="Acercar Cámara (Zoom In)"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          <div className="h-px w-full bg-[#45464f]/20"></div>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center text-[#e2e2eb] hover:bg-[#282a30] transition-colors"
            title="Alejar Cámara (Zoom Out)"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
          <div className="h-px w-full bg-[#45464f]/20"></div>
          <button
            onClick={handleResetCamera}
            className="w-10 h-10 flex items-center justify-center text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#282a30] transition-colors"
            title="Restablecer Perspectiva 360"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>

        <button
          onClick={() => {
            setShowHelp(!showHelp);
            soundFx.playClick();
          }}
          className="w-10 h-10 rounded-2xl bg-[#191b22]/90 backdrop-blur-xl border border-[#45464f]/30 flex items-center justify-center text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#282a30] transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          title="Instrucciones y Ayuda"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
        </button>
      </aside>

      {/* Slide-over Inspector Drawer: Docked Right Sheet (Zero Collision with Bottom HUD) */}
      {/* Mobile Backdrop */}
      {isDrawerOpen && (
        <div
          onClick={() => {
            setIsDrawerOpen(false);
            soundFx.playClick(400);
          }}
          className="fixed inset-0 top-20 bg-black/60 backdrop-blur-sm z-40 sm:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-20 right-0 bottom-0 w-full sm:w-[400px] bg-[#191b22]/98 border-l border-[#45464f]/40 backdrop-blur-2xl p-5 sm:p-6 shadow-[-20px_0_60px_rgba(0,0,0,0.85)] z-50 transition-transform duration-300 pointer-events-auto flex flex-col justify-between overflow-y-auto ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#45464f]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-lg">architecture</span>
              <span className="font-space text-base font-bold text-[#e2e2eb]">
                {activeStage.modalTitle}
              </span>
            </div>
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                soundFx.playClick();
              }}
              className="w-8 h-8 rounded-full bg-[#282a30] text-[#c6c5d0] hover:text-[#e2e2eb] hover:bg-[#33343b] flex items-center justify-center transition-colors"
              title="Cerrar panel"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <p className="text-xs text-[#c6c5d0] leading-relaxed">
            {activeStage.modalDesc}
          </p>

          {/* 4 Technical Badges Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#1e1f26] border border-[#45464f]/30">
              <span className="block font-space text-[10px] text-[#c6c5d0] uppercase">
                {activeStage.stat1.label}
              </span>
              <span className="font-space text-base font-bold text-[#b8c4fb] mt-0.5 block">
                {activeStage.stat1.value}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#1e1f26] border border-[#45464f]/30">
              <span className="block font-space text-[10px] text-[#c6c5d0] uppercase">
                {activeStage.stat2.label}
              </span>
              <span className="font-space text-base font-bold text-[#ffb4ab] mt-0.5 block">
                {activeStage.stat2.value}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#1e1f26] border border-[#45464f]/30">
              <span className="block font-space text-[10px] text-[#c6c5d0] uppercase">
                {activeStage.stat3.label}
              </span>
              <span className="font-space text-base font-bold text-[#e2e2eb] mt-0.5 block">
                {activeStage.stat3.value}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#1e1f26] border border-[#45464f]/30">
              <span className="block font-space text-[10px] text-[#c6c5d0] uppercase">
                {activeStage.stat4.label}
              </span>
              <span className="font-space text-base font-bold text-[#b8c4fb] mt-0.5 block">
                {activeStage.stat4.value}
              </span>
            </div>
          </div>

          {/* Key Engineering Details */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-[#c6c5d0] font-space uppercase font-bold tracking-wider">
              Especificaciones de Montaje:
            </span>
            <ul className="text-xs text-[#c6c5d0] space-y-1.5">
              {activeStage.details.map((item, i) => (
                <li key={i} className="flex items-start gap-2 bg-[#1e1f26]/60 p-2 rounded-lg border border-[#45464f]/20">
                  <span className="text-[#ffb4ab] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#45464f]/30 flex flex-col gap-2 mt-4">
          <button
            onClick={() => {
              onOpenSpecsModal();
              soundFx.playClick();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-[#1e2b58] text-[#b8c4fb] hover:bg-[#212e5b] hover:text-[#ffffff] font-space text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 border border-[#b8c4fb]/40"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Descargar Memoria Técnica (.txt)</span>
          </button>
        </div>
      </aside>

      {/* Help Modal Overlay */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#191b22] border border-[#45464f]/50 p-6 rounded-2xl max-w-md w-full shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#45464f]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb4ab]">explore</span>
                <h3 className="font-space text-lg font-bold text-[#e2e2eb]">
                  Controles del Tour Inmersivo
                </h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="w-7 h-7 rounded-full bg-[#282a30] text-[#c6c5d0] hover:text-[#e2e2eb] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-[#c6c5d0]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#b8c4fb] text-lg">swipe_vertical</span>
                <div>
                  <strong className="text-[#e2e2eb] block font-space">Navegación Continua:</strong>
                  Gira la rueda del ratón, haz scroll vertical o arrastra el control deslizante inferior para volar desde 48m de altura hasta el interior del festival.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ffb4ab] text-lg">ads_click</span>
                <div>
                  <strong className="text-[#e2e2eb] block font-space">Puntos Calientes (Hotspots):</strong>
                  Haz clic en las balizas rojas pulsantes para inspeccionar la ingeniería del encarpado, el fogón de cobre y los stands.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#a4c9ff] text-lg">wb_twilight</span>
                <div>
                  <strong className="text-[#e2e2eb] block font-space">Línea de Tiempo Solar:</strong>
                  Desliza la barra inferior izquierda para simular el atardecer y la noche festiva con luminarias cálidas.
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-2 rounded-xl bg-[#1e2b58] text-[#b8c4fb] font-space text-xs font-semibold hover:bg-[#212e5b]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
