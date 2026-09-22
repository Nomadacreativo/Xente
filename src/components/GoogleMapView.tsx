import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { soundFx } from '../utils/soundEffects';

interface GoogleMapViewProps {
  onGoToTourStage: (stageIndex: number) => void;
}

interface PlaceMarker {
  id: string;
  title: string;
  category: 'venue' | 'producer' | 'landmark' | 'parking';
  lat: number;
  lng: number;
  address: string;
  description: string;
  badge: string;
  iconName: string;
  color: string;
  stageTarget?: number;
}

const CELAYA_CENTER = { lat: 20.52353, lng: -100.81425 };

const PLACES: PlaceMarker[] = [
  {
    id: 'venue-main',
    title: 'Mega Encarpado Xente • Festival de la Cajeta 2026',
    category: 'venue',
    lat: 20.52353,
    lng: -100.81425,
    address: 'Jardín Principal s/n, Zona Centro, 38000 Celaya, Gto.',
    description: 'Sede principal del evento. 2,400 m² de encarpado monumental estructural libre de postes, 48 stands de productores cajeteros y fogón artesanal.',
    badge: 'Sede Oficial Xente',
    iconName: 'domain',
    color: '#ce0217',
    stageTarget: 0,
  },
  {
    id: 'landmark-carmen',
    title: 'Templo de Nuestra Señora del Carmen',
    category: 'landmark',
    lat: 20.52445,
    lng: -100.81395,
    address: 'Calle del Carmen s/n, Centro, 38000 Celaya, Gto.',
    description: 'Obra maestra del neoclasicismo mexicano diseñada por el ilustre arquitecto celayense Francisco Eduardo Tresguerras en 1807. Visible de fondo en la toma aérea.',
    badge: 'Patrimonio Histórico',
    iconName: 'church',
    color: '#b8c4fb',
    stageTarget: 0,
  },
  {
    id: 'venue-portal',
    title: 'Pórtico y Portal Independencia',
    category: 'venue',
    lat: 20.5232,
    lng: -100.8146,
    address: 'Portal Independencia, Jardín Principal, Celaya, Gto.',
    description: 'Acceso sur del festival con la escultura monumental de la Muñeca Otomí y demostración en vivo de cajeta batida en cazo de cobre al fuego.',
    badge: 'Pórtico Monumental',
    iconName: 'local_fire_department',
    color: '#ffb4ab',
    stageTarget: 1,
  },
  {
    id: 'producer-tradicional',
    title: 'Cajetas La Tradicional de Celaya (Fábrica Central)',
    category: 'producer',
    lat: 20.5228,
    lng: -100.8155,
    address: 'Calle Francisco I. Madero #202, Centro, Celaya, Gto.',
    description: 'Fundada en 1860. Más de 160 años elaborando cajeta de leche de cabra en cazos de cobre al fuego con recetas virreinales.',
    badge: 'Fabricante Tradicional',
    iconName: 'storefront',
    color: '#ffdcd8',
    stageTarget: 3,
  },
  {
    id: 'producer-especial',
    title: 'La Especial de Celaya',
    category: 'producer',
    lat: 20.5248,
    lng: -100.8131,
    address: 'Calle José María Morelos #144, Centro, Celaya, Gto.',
    description: 'Famosa por su cajeta envinada con jerez y alfajores típicos. Expositores activos en el Stand A-08 del encarpado.',
    badge: 'Fabricante Tradicional',
    iconName: 'storefront',
    color: '#ffdcd8',
    stageTarget: 3,
  },
  {
    id: 'producer-reina',
    title: 'Dulces Típicos La Reina de Celaya',
    category: 'producer',
    lat: 20.5239,
    lng: -100.8152,
    address: 'Portal Guerrero #108, Jardín Principal, Celaya, Gto.',
    description: 'Especialistas en cajete de madera tejido a mano y alfeñiques. Expositores en el Stand B-04.',
    badge: 'Fabricante Tradicional',
    iconName: 'storefront',
    color: '#ffdcd8',
    stageTarget: 3,
  },
  {
    id: 'parking-norte',
    title: 'Estacionamiento Municipal y Accesos Peatonales',
    category: 'parking',
    lat: 20.5252,
    lng: -100.8148,
    address: 'Calle Hidalgo #310, Centro Histórico, Celaya, Gto.',
    description: 'Área de estacionamiento seguro a 180 metros del acceso norte del encarpado ferial. Capacidad para 250 vehículos.',
    badge: 'Estacionamiento',
    iconName: 'local_parking',
    color: '#a4c9ff',
  },
  {
    id: 'parking-sur',
    title: 'Estacionamiento Morelos & Parque Morelos',
    category: 'parking',
    lat: 20.5218,
    lng: -100.8138,
    address: 'Calle Morelos esq. Calzada Independencia, Celaya, Gto.',
    description: 'Estacionamiento con vigilancia 24h y punto de ascenso para autobuses turísticos y visitantes foráneos.',
    badge: 'Estacionamiento & Buses',
    iconName: 'local_parking',
    color: '#a4c9ff',
  },
];

// Dark Google Maps Theme matching the Spatial Immersion Engine UI
const DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#111319' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#111319' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#c6c5d0' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#b8c4fb' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#a4c9ff' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#191b22' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8e9379' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e2b58' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0c0e14' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e2e2eb' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#283500' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#161e00' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#24005b' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0c0e14' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5298ec' }],
  },
];

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({ onGoToTourStage }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const streetViewContainerRef = useRef<HTMLDivElement>(null);

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [streetViewPanorama, setStreetViewPanorama] = useState<google.maps.StreetViewPanorama | null>(null);
  const [isStreetViewActive, setIsStreetViewActive] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<PlaceMarker>(PLACES[0]);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Initialize Google Maps API
  useEffect(() => {
    let isCancelled = false;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBCRjKkyZTOg1OMgKwItJjs7NiWjJQnwYY';

    setOptions({
      key: apiKey,
      v: 'weekly',
    });

    const initMap = async () => {
      try {
        const { Map, InfoWindow } = await importLibrary('maps');
        const { StreetViewPanorama } = await importLibrary('streetView');
        if (isCancelled || !mapContainerRef.current) return;

        const map = new Map(mapContainerRef.current, {
          center: CELAYA_CENTER,
          zoom: 17,
          styles: DARK_MAP_STYLE,
          mapTypeId: 'roadmap',
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: false,
        });

        // Setup Street View Panorama
        if (streetViewContainerRef.current) {
          const panorama = new StreetViewPanorama(streetViewContainerRef.current, {
            position: CELAYA_CENTER,
            pov: { heading: 340, pitch: 10 },
            visible: false,
          });
          map.setStreetView(panorama);
          setStreetViewPanorama(panorama);
        }

        infoWindowRef.current = new InfoWindow();
        setMapInstance(map);
        setIsMapLoaded(true);
      } catch (err: unknown) {
        console.error('Error loading Google Maps:', err);
        if (!isCancelled) {
          setLoadError(
            'No se pudo conectar con Google Maps Platform. Verifica la conexión a internet o la configuración de la clave de API.'
          );
        }
      }
    };

    initMap();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Update Markers based on Category filter
  useEffect(() => {
    if (!mapInstance || !isMapLoaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const filtered = PLACES.filter((p) => {
      if (activeCategory === 'all') return true;
      return p.category === activeCategory;
    });

    filtered.forEach((place) => {
      // Create custom SVG Pin Icon
      const isSelected = place.id === selectedPlace.id;
      const marker = new google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: mapInstance,
        title: place.title,
        animation: isSelected ? google.maps.Animation.BOUNCE : undefined,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: isSelected ? 12 : 9,
          fillColor: place.color,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      marker.addListener('click', () => {
        setSelectedPlace(place);
        soundFx.playClick(750);

        if (infoWindowRef.current) {
          const contentString = `
            <div style="background:#191b22; color:#e2e2eb; padding:12px; border-radius:12px; font-family:'Space Grotesk',sans-serif; max-width:240px;">
              <span style="font-size:10px; color:${place.color}; font-weight:bold; text-transform:uppercase;">${place.badge}</span>
              <h4 style="margin:4px 0 6px; font-size:14px; font-weight:bold;">${place.title}</h4>
              <p style="margin:0; font-size:11px; color:#c6c5d0; line-height:1.4;">${place.description}</p>
              <div style="margin-top:8px; font-size:10px; color:#8793c7;">${place.address}</div>
            </div>
          `;
          infoWindowRef.current.setContent(contentString);
          infoWindowRef.current.open(mapInstance, marker);
        }
      });

      markersRef.current.push(marker);
    });
  }, [mapInstance, isMapLoaded, activeCategory, selectedPlace]);

  // Center map on place selection
  const handleSelectPlace = (place: PlaceMarker) => {
    setSelectedPlace(place);
    soundFx.playClick(650);

    if (mapInstance) {
      mapInstance.panTo({ lat: place.lat, lng: place.lng });
      mapInstance.setZoom(18);
    }
    if (streetViewPanorama && isStreetViewActive) {
      streetViewPanorama.setPosition({ lat: place.lat, lng: place.lng });
    }
  };

  // Toggle Map Type
  const handleMapTypeChange = (type: 'roadmap' | 'satellite' | 'hybrid') => {
    setMapType(type);
    soundFx.playClick();
    if (!mapInstance) return;

    if (type === 'satellite') {
      mapInstance.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      mapInstance.setOptions({ styles: [] });
    } else if (type === 'hybrid') {
      mapInstance.setMapTypeId(google.maps.MapTypeId.HYBRID);
      mapInstance.setOptions({ styles: [] });
    } else {
      mapInstance.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      mapInstance.setOptions({ styles: DARK_MAP_STYLE });
    }
  };

  // Toggle Street View
  const toggleStreetView = () => {
    soundFx.playClick();
    const newState = !isStreetViewActive;
    setIsStreetViewActive(newState);

    if (streetViewPanorama) {
      streetViewPanorama.setVisible(newState);
      if (newState) {
        streetViewPanorama.setPosition({ lat: selectedPlace.lat, lng: selectedPlace.lng });
      }
    }
  };

  // Reset to Festival Center
  const handleResetCenter = () => {
    soundFx.playClick(500);
    if (mapInstance) {
      mapInstance.panTo(CELAYA_CENTER);
      mapInstance.setZoom(17);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#111319] p-4 sm:p-6 lg:p-8 text-[#e2e2eb] flex flex-col">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#45464f]/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ce0217] animate-ping"></span>
            <span className="font-space text-xs uppercase tracking-widest text-[#ffb4ab] font-bold">
              Google Maps Platform • Geolocalización Celaya 2026
            </span>
          </div>
          <h1 className="font-space text-2xl sm:text-3xl font-bold tracking-tight text-[#e2e2eb]">
            Ubicación Satelital y Coordenadas del Festival
          </h1>
          <p className="text-xs sm:text-sm text-[#c6c5d0] mt-1 max-w-2xl">
            Jardín Principal de Celaya, Guanajuato. Explora el perímetro del encarpado monumental, accesos peatonales, fábricas históricas de cajeta y estacionamientos autorizados.
          </p>
        </div>

        {/* Map Type Controls and Reset */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-[#0c0e14] p-1 rounded-xl border border-[#45464f]/40">
            <button
              onClick={() => handleMapTypeChange('roadmap')}
              className={`px-2.5 py-1 text-xs font-space font-medium rounded-lg transition-all ${
                mapType === 'roadmap'
                  ? 'bg-[#1e2b58] text-[#b8c4fb] font-semibold border border-[#b8c4fb]/30'
                  : 'text-[#c6c5d0] hover:text-[#e2e2eb]'
              }`}
            >
              Cyber Dark
            </button>
            <button
              onClick={() => handleMapTypeChange('satellite')}
              className={`px-2.5 py-1 text-xs font-space font-medium rounded-lg transition-all ${
                mapType === 'satellite'
                  ? 'bg-[#1e2b58] text-[#b8c4fb] font-semibold border border-[#b8c4fb]/30'
                  : 'text-[#c6c5d0] hover:text-[#e2e2eb]'
              }`}
            >
              Satélite HD
            </button>
            <button
              onClick={() => handleMapTypeChange('hybrid')}
              className={`px-2.5 py-1 text-xs font-space font-medium rounded-lg transition-all ${
                mapType === 'hybrid'
                  ? 'bg-[#1e2b58] text-[#b8c4fb] font-semibold border border-[#b8c4fb]/30'
                  : 'text-[#c6c5d0] hover:text-[#e2e2eb]'
              }`}
            >
              Híbrido
            </button>
          </div>

          <button
            onClick={toggleStreetView}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-space font-semibold transition-all ${
              isStreetViewActive
                ? 'bg-[#ce0217] text-[#ffffff] border-[#ffb4ab]'
                : 'bg-[#1e1f26] text-[#c6c5d0] hover:text-[#e2e2eb] border-[#45464f]/40'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">streetview</span>
            <span className="hidden sm:inline">Street View 360°</span>
          </button>

          <button
            onClick={handleResetCenter}
            className="w-8 h-8 rounded-xl bg-[#1e1f26] hover:bg-[#282a30] text-[#c6c5d0] hover:text-[#e2e2eb] border border-[#45464f]/40 flex items-center justify-center transition-all"
            title="Centrar en el Jardín Principal de Celaya"
          >
            <span className="material-symbols-outlined text-[17px]">my_location</span>
          </button>
        </div>
      </div>

      {/* Main Map Container Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 flex-1">
        {/* Left Side: Places & Points of Interest List */}
        <div className="lg:col-span-4 flex flex-col gap-3 order-2 lg:order-1">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'venue', label: 'Encarpado Xente' },
              { id: 'producer', label: 'Fábricas Cajeta' },
              { id: 'parking', label: 'Estacionamientos' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  soundFx.playClick(600);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-space whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1e2b58] text-[#b8c4fb] font-semibold border border-[#b8c4fb]/40 shadow-sm'
                    : 'bg-[#191b22] text-[#c6c5d0] hover:text-[#e2e2eb] border border-[#45464f]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Place Cards List */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {PLACES.filter((p) => activeCategory === 'all' || p.category === activeCategory).map((place) => {
              const isSelected = place.id === selectedPlace.id;
              return (
                <div
                  key={place.id}
                  onClick={() => handleSelectPlace(place)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-[#1e2b58]/50 border-[#b8c4fb]/50 shadow-[0_0_20px_rgba(30,43,88,0.5)]'
                      : 'bg-[#191b22]/90 border-[#45464f]/30 hover:border-[#45464f]/70 hover:bg-[#1e1f26]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: place.color }}
                      ></span>
                      <h3 className="font-space text-xs sm:text-sm font-bold text-[#e2e2eb]">
                        {place.title}
                      </h3>
                    </div>
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-[#0c0e14] text-[#c6c5d0] border border-[#45464f]/30 shrink-0">
                      {place.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#c6c5d0] leading-snug line-clamp-2">
                    {place.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#45464f]/20 text-[10px] text-[#8793c7]">
                    <span className="truncate">{place.address}</span>
                    {place.stageTarget !== undefined && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onGoToTourStage(place.stageTarget || 0);
                          soundFx.playClick(850);
                        }}
                        className="text-[#ffb4ab] hover:underline font-space font-semibold shrink-0 ml-2 flex items-center gap-0.5"
                      >
                        <span>Ver en 3D</span>
                        <span className="material-symbols-outlined text-[13px]">3d_rotation</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* How to Get There Quick Info Card */}
          <div className="p-4 rounded-2xl bg-[#1e1f26] border border-[#45464f]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#b8c4fb]">
              <span className="material-symbols-outlined text-base">directions</span>
              <h4 className="font-space text-xs font-bold uppercase tracking-wider text-[#e2e2eb]">
                Accesos Viales Principales
              </h4>
            </div>
            <p className="text-[11px] text-[#c6c5d0] leading-snug">
              Desde Querétaro o León por la Autopista Federal 45D: Toma el Bulevar Adolfo López Mateos directo hacia el Centro Histórico y desvía por Calle Morelos hacia el Jardín Principal.
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${CELAYA_CENTER.lat},${CELAYA_CENTER.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-space font-bold text-[#ffdcd8] hover:text-[#ffffff] pt-1"
            >
              <span>Abrir Navegación GPS en Google Maps</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Right Side: Map Canvas Viewport */}
        <div className="lg:col-span-8 flex flex-col gap-3 order-1 lg:order-2">
          <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[620px] rounded-3xl overflow-hidden border border-[#45464f]/40 shadow-2xl bg-[#0c0e14]">
            {/* Google Maps Div */}
            <div
              ref={mapContainerRef}
              className={`w-full h-full ${isStreetViewActive ? 'hidden' : 'block'}`}
            ></div>

            {/* Street View Container */}
            <div
              ref={streetViewContainerRef}
              className={`w-full h-full ${isStreetViewActive ? 'block' : 'hidden'}`}
            ></div>

            {/* Loading or Error State */}
            {!isMapLoaded && !loadError && (
              <div className="absolute inset-0 bg-[#111319]/90 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 border-4 border-[#1e2b58] border-t-[#b8c4fb] rounded-full animate-spin mb-3"></div>
                <h3 className="font-space text-sm font-bold text-[#e2e2eb]">
                  Cargando Google Maps Platform...
                </h3>
                <p className="text-xs text-[#c6c5d0] mt-1">
                  Inicializando cartografía espacial y coordenadas de Celaya 2026
                </p>
              </div>
            )}

            {loadError && (
              <div className="absolute inset-0 bg-[#111319]/95 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-3xl text-[#ffb4ab] mb-2">error</span>
                <h3 className="font-space text-base font-bold text-[#e2e2eb]">
                  Aviso de Google Maps Platform
                </h3>
                <p className="text-xs text-[#c6c5d0] max-w-md mt-1">{loadError}</p>
                <div className="mt-4 p-3 rounded-xl bg-[#1e1f26] border border-[#45464f]/40 text-xs font-mono text-[#b8c4fb]">
                  Coordenadas Centro: 20.52353° N, -100.81425° W
                </div>
              </div>
            )}

            {/* Floating Telemetry Badge in Map Corner */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#191b22]/90 backdrop-blur-xl border border-[#45464f]/40 shadow-xl max-w-xs pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ce0217]"></span>
                <span className="font-space text-[10px] font-bold uppercase text-[#ffb4ab] tracking-wider">
                  GPS Celaya • Guanajuato
                </span>
              </div>
              <div className="font-mono text-xs text-[#e2e2eb] font-semibold mt-1">
                20°31'24.7"N 100°48'51.3"W
              </div>
              <div className="text-[10px] text-[#c6c5d0] mt-0.5">
                Elevación: 1,750 msnm • Explanada Central
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
