import { StageSpec, Hotspot, CajetaProducer, PhotoScreen } from '../types';

export const ASSETS = {
  logoFull: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_qWftDE4X5P5ZnROEykSIe8dt0IF92mVkEIX9txaghXlcPhWjfEolBfSXzdP_3lnF-d0P3pTkEHbLyreY7-3qAS0utkuUWHAc-GrZqO5vqQslZu7rEdG5pgamQVVs8BX0k124FcDUKfzYvY49BK6_7AWMKsneJnr0KtGz3nHM1DOb6vgzO6t2eFyxf4hC4VMeNiRp5Qx1u6feOO35CCLYD8PoKmGyBB_4dDIiKVykx4PmDHTJetdLyAozibOMUK2lP3w",
  logoMark: "https://lh3.googleusercontent.com/aida-public/AB6AXuA34PThi9REe38gwZjcOhbkgn9EJ4a15Ists1ViPtIo0U86-hMv8bHN7L0sbsL9kaCxeMGfAaKldSyffR2iDWLa_r4vUj2WUd0Z-EaOROtTsVl1uPVdaMqn8QLKaJ3CBwtbuyyDya56Wxk_3gS_gbSDXwiX3JD1zhWi_lvDFNADYWYM7QHXEKrWTCqCHqdjEKWRZZx7XeKyDWiBgpH6J8IU6RjSA1pTRQp17890IRE1IjM-8Ye1ECgEwEqdyQQktfPe2QU",
  layerAerial: "https://lh3.googleusercontent.com/aida-public/AB6AXuCID9booNY5yplrijp18-HMdjImMAqVDNEgwsZRhyq5KZo9Z1v6TMETXXFvkWCAu37svsDV9ExnYy8tQw0xFZpO8FcamCLdGk7BPK5mtHO3D0epf1iIsRb_y3BgjZECUwJ2myBFkloVv9-OnJEwHnurMORXIoExt8i3PJWQC_NL_iJ0faB8lLxuFsW5w3rOCJog-3z2WSjE2vp56wgCRgWNYDnOBHb1iLzmAhw5vhXPGEP7ZCWGFM9QJsW2g69VnG1zQpU",
  layerEntranceElevated: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsMWuA7ua8dRxUI-HJpjcLv_P1GHwvBXp9qwG7cz108-7-VA2SUJD05WYSocCInE20rpqb9T8-8FKJDCZtPqhmKUbiBxG4AqDnhXSvuDSqgbAqcxZ9nDQT-QFoQJXFgsPSBwNEz4zPQJWYzonoo5aHdvWC8jgIWkFZjKyfUgJcUUfKTUbW07gFN5ZUJPWJ4YPD69jJLm8NrpAFTmRuBIKHo0JN4ZvL1TO0E_mbeyX8FtDI9yjPF9xnxskN3ndCT_BQpkQ",
  layerInteriorAisle: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_2C5ECOBcnN3kJ0emuTRgz4qYj_BV42p_ecCiK_ZXaBZA8tlLal-7neLZ_R8OAME4EAcVKTZQCMp9ZYuH9Zyec_HtPaqEhBLWb2qf-RaIzhBZs4cU1mjSgwgMM0kIYLrDjJpU_PuaTTpnXb9jtxSamDGxRb8y5dfygSt2GlLhjd-_ttqKc3y2u_qF1qrVwO_579GwlqUGLkpp9EQMQZhwdIZG1voLSm9ALN0Ang0xB3ZxNDAnd6lviuPbgPyGKCMsfhg",
};

export const STAGES: StageSpec[] = [
  {
    id: "stage-01",
    num: "01",
    title: "Vista Aérea Macro",
    subtitle: "Dron Cenital sobre el Centro Histórico de Celaya",
    alt: 48.0,
    fov: 74,
    speedText: "Dron Descendiendo",
    hotspotLabel: "Mega Encarpado 24m Xente",
    modalTitle: "Mega Encarpado Xente Celaya",
    modalDesc: "Montaje panorámico integral en la explanada principal de Celaya frente al Templo del Carmen. Lona blackout alemana con membrana atérmica retardante al fuego y anclajes estructurales certificados.",
    stat1: { label: "Claro Libre", value: "24.0 m" },
    stat2: { label: "Resistencia Viento", value: "110 km/h" },
    stat3: { label: "Aforo Estimado", value: "4,500 pax" },
    stat4: { label: "Ingeniería", value: "Xente MX" },
    imageUrl: ASSETS.layerAerial,
    details: [
      "Superficie cubierta total: 2,400 m² sin apoyos intermedios para libre circulación",
      "Estructura reticular de aluminio 6061-T6 con perfilería reforzada",
      "Canalones perimetrales de desagüe pluvial con capacidad de 120 mm/h",
      "Certificación estructural avalada por DRO y Protección Civil Municipal"
    ]
  },
  {
    id: "stage-02",
    num: "02",
    title: "Pórtico y Acceso Monumental",
    subtitle: "Aproximación al Portal Festivo y Fogón Tradicional",
    alt: 14.5,
    fov: 70,
    speedText: "Aproximación Acceso",
    hotspotLabel: "Fogón de Cobre y Muñeca Tradicional",
    modalTitle: "Portal Festivo y Muñeca Celayense",
    modalDesc: "Entrada folclórica monumental al pabellón, con escultura a escala real de la tradicional Muñeca Celayense Otomí, fogón vivo de ladrillo artesanal y cazo de cobre martillado para exhibición de cajeta en vivo.",
    stat1: { label: "Altura Pórtico", value: "6.5 m alto" },
    stat2: { label: "Seguridad Lona", value: "Ignífugo M2" },
    stat3: { label: "Flujo peatonal", value: "90 p/min" },
    stat4: { label: "Control de Acceso", value: "Torniquete Libre" },
    imageUrl: ASSETS.layerEntranceElevated,
    details: [
      "Guirnaldas artesanales con cazos miniatura de cobre, cucharas de palo y sombreros de palma",
      "Fogón de ladrillo con tiro térmico controlado para exhibición continua de batido",
      "Punto de información turística y bienvenida oficial por el Municipio de Celaya",
      "Señalética fotoluminiscente de evacuación en ambos costados del portal"
    ]
  },
  {
    id: "stage-03",
    num: "03",
    title: "Pasillo Central • Papel Picado",
    subtitle: "Inmersión bajo la Bóveda de 3,500 m de Color",
    alt: 4.2,
    fov: 66,
    speedText: "Inmersión Pasillo",
    hotspotLabel: "Cielo de Papel Picado Celayense (3,500 m)",
    modalTitle: "Cielo de Papel Picado Multicolor",
    modalDesc: "Túnel cenital con más de 3,500 metros de guirnaldas de papel picado calado a mano con motivos alusivos a la cajeta de cabra y el escudo de Celaya, suspendidas en cables de acero tensado.",
    stat1: { label: "Longitud Eje", value: "95.0 m largo" },
    stat2: { label: "Capacidad Colgante", value: "350 kg/eje" },
    stat3: { label: "Capacidad Mesas", value: "800 comensales" },
    stat4: { label: "Iluminación", value: "LED Cálida 2700K" },
    imageUrl: ASSETS.layerInteriorAisle,
    details: [
      "Luminarias tipo guirnalda Edison de bajo consumo conectadas a red regulada",
      "Mesas rústicas de convivencia con caminos de mesa artesanales de telar de cintura",
      "Centro de mesa floral con girasoles frescos y follaje de la región del Bajío",
      "Ventilación cruzada inducida a través de faldones perimetrales microperforados"
    ]
  },
  {
    id: "stage-04",
    num: "04",
    title: "Pabellón de Productores",
    subtitle: "Zona de Degustación y Expositores Artesanales",
    alt: 1.8,
    fov: 62,
    speedText: "Pabellón Productores",
    hotspotLabel: "Módulos de Productores Cajeteros",
    modalTitle: "Stands y Degustación de Cajeta",
    modalDesc: "Línea completa de islas modulares en herrería y madera para 48 fabricantes artesanales de Celaya con dotación de corriente eléctrica estabilizada, agua purificada y grado sanitario.",
    stat1: { label: "Stands Activos", value: "48 Módulos" },
    stat2: { label: "Conexión Red", value: "220V / 110V" },
    stat3: { label: "Norma Sanitaria", value: "COFEPRIS OK" },
    stat4: { label: "Derrama Estimada", value: "+$18M MXN" },
    imageUrl: ASSETS.layerInteriorAisle,
    details: [
      "Degustación guiada de cajeta quemada, envinada, de nuez, vainilla y cajeta en cajete de madera",
      "Terminales de cobro digital (TPV) con respaldo de red Wi-Fi de alta densidad de Xente",
      "Punto de reciclaje y separación de residuos orgánicos e inorgánicos",
      "Módulos para empaque con sellos de Denominación de Origen Celaya"
    ]
  }
];

export const HOTSPOTS: Hotspot[] = [
  {
    id: "hotspot-0",
    stageIndex: 0,
    top: "38%",
    left: "50%",
    title: "Mega Encarpado 24m Xente",
    icon: "domain",
    category: "structural",
    description: "Encarpado monumental de 2,400 m² de claro libre sin postes intermedios, soportado por cerchas estructurales de aluminio 6061-T6 y lona blackout alemana ignífuga.",
    stats: [
      { label: "Ancho Claro", val: "24 metros" },
      { label: "Largo Total", val: "100 metros" },
      { label: "Capacidad", val: "4,500 personas" }
    ]
  },
  {
    id: "hotspot-1",
    stageIndex: 1,
    top: "54%",
    left: "38%",
    title: "Fogón Vivo y Muñeca Celayense",
    icon: "local_fire_department",
    category: "cultural",
    description: "Fogón tradicional de tabique rojo con cazo de cobre martillado al fuego donde maestros cajeteros elaboran en vivo la cajeta de leche de cabra batida con pala de madera.",
    stats: [
      { label: "Material Cazo", val: "Cobre martillado 80L" },
      { label: "Cocción", val: "Leche pura de cabra + azúcar" },
      { label: "Tradición", val: "Desde el siglo XVIII" }
    ]
  },
  {
    id: "hotspot-2",
    stageIndex: 2,
    top: "28%",
    left: "50%",
    title: "Cielo de Papel Picado Celayense",
    icon: "celebration",
    category: "cultural",
    description: "Bóveda festiva suspendida a 6.5 metros de altura con más de 3,500 metros lineales de papel picado calado a mano con los colores y emblemas de Celaya.",
    stats: [
      { label: "Metros Lineales", val: "3,500 m" },
      { label: "Colores", val: "Rosa mexicano, amarillo, verde, azul" },
      { label: "Sujeción", val: "Cable de acero aeronáutico" }
    ]
  },
  {
    id: "hotspot-3",
    stageIndex: 3,
    top: "66%",
    left: "76%",
    title: "Módulos de Productores Cajeteros",
    icon: "storefront",
    category: "gastronomic",
    description: "48 stands modulares diseñados por Xente con iluminación puntual LED, barras de madera rústica y refrigeración para venta directa de los productores tradicionales.",
    stats: [
      { label: "Expositores", val: "48 marcas registradas" },
      { label: "Variedades", val: "Quemada, Envinada, Nuez, Vainilla" },
      { label: "Empaque", val: "Cajete de madera tradicional" }
    ]
  }
];

export const PHOTO_SCREENS: PhotoScreen[] = [
  {
    id: "screen-01",
    title: "Vista Aérea Macro • Explanada de Celaya",
    subtitle: "Toma panorámica con dron a 48 metros de elevación",
    badge: "Ángulo 01 • Macro Aérea",
    imageUrl: ASSETS.layerAerial,
    elevation: "48.0 m",
    coverage: "2,400 m²",
    description: "Panorámica cenital que muestra el despliegue del Mega Encarpado Xente en el corazón del Centro Histórico de Celaya, con el Templo del Carmen al fondo y los portales coloniales flanqueando la explanada.",
    keyFeatures: [
      "Montaje simétrico integrado a la arquitectura colonial de Celaya",
      "Lona alemana blanca translúcida con filtro UV de alta reflectancia térmica",
      "Corredores de seguridad perimetrales de 4 metros libres para tránsito peatonal",
      "Integración de pasacalles festivos multicolores que conectan los portales con la carpa"
    ]
  },
  {
    id: "screen-02",
    title: "Aproximación al Pórtico de Acceso",
    subtitle: "Dron a 14 metros capturando la fachada monumental",
    badge: "Ángulo 02 • Fachada y Pórtico",
    imageUrl: ASSETS.layerEntranceElevated,
    elevation: "14.5 m",
    coverage: "Portal 24m",
    description: "Perspectiva intermedia que resalta el frente del pabellón, la entrada de 6.5m de altura decorada con artesanías tradicionales y la emblemática muñeca María frente al fogón de ladrillo.",
    keyFeatures: [
      "Pórtico truss recubierto con textiles y artesanías del Bajío guanajuatense",
      "Fogón de ladrillo con cazo de cobre martillado y palas de madera gigantes",
      "Vallas de protección ordenadas en madera natural y telas tradicionales",
      "Flujo controlado para 90 comensales y visitantes por minuto"
    ]
  },
  {
    id: "screen-03",
    title: "Detalle del Acceso a Nivel Peatonal",
    subtitle: "Perspectiva humana frente al fogón y muñeca tradicional",
    badge: "Ángulo 03 • Nivel Peatonal",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsMWuA7ua8dRxUI-HJpjcLv_P1GHwvBXp9qwG7cz108-7-VA2SUJD05WYSocCInE20rpqb9T8-8FKJDCZtPqhmKUbiBxG4AqDnhXSvuDSqgbAqcxZ9nDQT-QFoQJXFgsPSBwNEz4zPQJWYzonoo5aHdvWC8jgIWkFZjKyfUgJcUUfKTUbW07gFN5ZUJPWJ4YPD69jJLm8NrpAFTmRuBIKHo0JN4ZvL1TO0E_mbeyX8FtDI9yjPF9xnxskN3ndCT_BQpkQ",
    elevation: "1.7 m",
    coverage: "Punto Focal 12m",
    description: "Encuadre a nivel de piso donde los asistentes se toman la fotografía del recuerdo junto a la muñeca artesanal monumental y pueden presenciar el hervor aromático de la cajeta de Celaya.",
    keyFeatures: [
      "Escultura tradicional mexicana vestida con faldas típicas y trenzas",
      "Fogón artesanal con brasas controladas y chimenea de tiro vertical",
      "Pabellón de Turismo de Celaya con folletería y mapas de la Ruta del Dulce",
      "Piso de adoquín nivelado con rampas de accesibilidad universal"
    ]
  },
  {
    id: "screen-04",
    title: "Gran Pasillo Central y Bóveda Multicolor",
    subtitle: "Perspectiva interior bajo el cielo de papel picado",
    badge: "Ángulo 04 • Interior Festivo",
    imageUrl: ASSETS.layerInteriorAisle,
    elevation: "2.4 m",
    coverage: "95 m pasillo",
    description: "Vista longitudinal del corredor central, iluminado por luz difusa natural y decorado con miles de banderines de papel picado con el rótulo de CELAYA que bailan con la brisa.",
    keyFeatures: [
      "3,500 m lineales de papel picado calado a mano en colores vibrantes",
      "Mesas comunales de madera con caminos bordados para degustación familiar",
      "Arreglos florales frescos con girasoles y follaje silvestre regional",
      "Amplitud interior de 6.5 metros de puntal que evita la sensación de encierro"
    ]
  }
];

export const CAJETA_PRODUCERS: CajetaProducer[] = [
  {
    id: "prod-01",
    name: "Cajetas La Tradicional de Celaya",
    founded: "1860",
    specialty: "Cajeta Quemada en Cazo de Cobre",
    description: "Más de 160 años de linaje cajetero utilizando 100% leche de cabra de pastoreo, azúcar morena y vainilla natural en rama en auténticos cajetes de madera de pino.",
    standLocation: "Stand A-01 (Frente a Portal Norte)",
    flavors: ["Quemada Tradicional", "Envinada al Ron Añejo", "Vainilla Real", "Cajeta con Nuez Pecana"],
    award: "Medalla de Oro al Sabor de Guanajuato 2024"
  },
  {
    id: "prod-02",
    name: "La Especial de Celaya",
    founded: "1912",
    specialty: "Cajeta Envinada con Jerez y Almendras",
    description: "Reconocida por su textura aterciopelada y recetas centenarias pasadas por 4 generaciones familiares con sello de Denominación de Origen.",
    standLocation: "Stand A-08",
    flavors: ["Envinada al Jerez", "Quemada Suave", "Dulce de Leche Natural", "Obleas Gigantes"],
    award: "Premio Bicentenario a la Tradición Gastronómica"
  },
  {
    id: "prod-03",
    name: "Dulces Típicos La Reina",
    founded: "1948",
    specialty: "Cajeta en Cajete Rústico y Alfeñiques",
    description: "Empaque original en cajas cilíndricas de madera tejida y papel celofán, conservando el método de preservación que dio nombre a la cajeta.",
    standLocation: "Stand B-04",
    flavors: ["Quemada Clásica", "Cajeta de Café de Olla", "Garras de Tigre", "Jamoncillos de Leche"],
    award: "Certificación Marca Guanajuato de Excelencia"
  },
  {
    id: "prod-04",
    name: "Cajetas San Francisco",
    founded: "1975",
    specialty: "Línea Gourmet Reducida en Azúcar",
    description: "Innovación con respeto a la herencia: cajetas con agave orgánico, frutos secos tostados al momento y maridajes con quesos de la región de Celaya.",
    standLocation: "Stand B-12",
    flavors: ["Gourmet con Piñón Rosa", "Mezcal Artesanal", "Quemada Reducida", "Churros Rellenos"],
    award: "Distintivo Punto Limpio 2025"
  }
];

export const XENTE_SPECS = {
  company: "Xente Soluciones Integrales",
  division: "Ingeniería Ferial y Arquitectura Efímera",
  location: "Celaya, Guanajuato, México",
  dimensions: {
    clearSpan: "24.0 metros libres",
    totalLength: "100.0 metros lineales",
    totalArea: "2,400 m² de superficie cubierta",
    peakHeight: "7.20 metros al vértice de cresta",
    eaveHeight: "4.50 metros de altura a hombros"
  },
  structuralSystem: {
    profiles: "Aleación de aluminio estructural 6061-T6 anodizado anticorrosión",
    connections: "Herrajes de acero galvanizado por inmersión en caliente Grado 8.8",
    anchoring: "Anclaje certificado con balasto sísmico/eólico y anclas químicas de acero",
    windRating: "Diseño para ráfagas de viento de hasta 110 km/h (Norma NMX-C-450-ONNCCE)"
  },
  membrane: {
    type: "Membrana textil pretensada blackout de procedencia alemana",
    weight: "850 g/m² con alma de poliéster de alta tenacidad",
    treatment: "Recubrimiento atérmico PVDF autolimpiable y filtro UV 99.8%",
    fireRating: "Certificación M2 / DIN 4102 B1 (Autoextinguible retardante al fuego)"
  },
  safetyAndLogistics: {
    capacity: "4,500 personas simultáneas",
    exits: "8 salidas de emergencia con claros de 3.0 m y señalización fotoluminiscente",
    electrical: "Red trifásica 220V/110V balanceada con tableros de supresión de picos",
    lighting: "Cielo de iluminación LED cálida con 120,000 lúmenes distribuidos",
    inspection: "Aprobada por Dictamen Estructural de Protección Civil y Colegio de Ingenieros"
  }
};
