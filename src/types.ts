export interface StageSpec {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  alt: number; // meters
  fov: number; // degrees
  speedText: string;
  hotspotLabel: string;
  modalTitle: string;
  modalDesc: string;
  stat1: { label: string; value: string };
  stat2: { label: string; value: string };
  stat3: { label: string; value: string };
  stat4: { label: string; value: string };
  imageUrl: string;
  details: string[];
}

export interface Hotspot {
  id: string;
  stageIndex: number;
  top: string;
  left: string;
  title: string;
  icon: string;
  category: 'structural' | 'cultural' | 'gastronomic' | 'safety';
  description: string;
  stats?: { label: string; val: string }[];
}

export interface CajetaProducer {
  id: string;
  name: string;
  founded: string;
  specialty: string;
  description: string;
  standLocation: string;
  flavors: string[];
  award: string;
}

export interface PhotoScreen {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  elevation: string;
  coverage: string;
  description: string;
  keyFeatures: string[];
}
