import { Product, LenzeVariateurSubCategory } from "@/lib/types";
import { cache } from 'react';
import fs from 'fs';
import path from 'path';
import {
  isWagoProduct,
  sortProductResults,
  WAGO_INSTALLATION_CATEGORY,
  WAGO_INSTALLATION_PRODUCTS,
} from '@/lib/products/wagoInstallationProducts';
import { paginateProducts } from '@/lib/products/catalog';

// Ajout d'un tableau pour les images additionnelles des produits
export const extraImages: Record<string, string[]> = {
  "lenze-012": ["/images/products/i550protecb.webp"],
  "lenze-013": [],
  "lenze-014": [],
  "lenze-015": ["/images/products/8400pb.webp"],
  "lenze-016": ["/images/products/8400mb.webp", "/images/products/8400mc.webp"],
  "lenze-017": [],
};

// Ajout d'un mapping pour les images locales à utiliser comme fallback pour les produits antérieurs
export const productImageMapping: Record<string, string> = {
  // Variateurs de vitesse
  "8400 BaseLine": "/images/products/8400.webp",
  "8400 StateLine": "/images/products/8400.webp",
  "8400 HighLine": "/images/products/8400h.webp",
  "8400 TopLine": "/images/products/8400.webp",
  "8400 motec": "/images/products/8400ma.webp",
  "8400 protec": "/images/products/8400pa.webp",
  "SMVector": "/images/products/SMVector.webp",
  "i550": "/images/products/i550.webp",
  "i650": "/images/products/i650.webp",
  "i510": "/images/products/i510a.webp",
  
  // Servovariateurs
  "i750 cabinet": "/images/products/i550.webp", // Image par défaut pour servovariateurs
  "i700 cabinet": "/images/products/i550.webp", // Image par défaut pour servovariateurs
  "i950 cabinet": "/images/products/i550.webp", // Image par défaut pour servovariateurs
  "9400 HighLine": "/images/products/8400h.webp", // Utilise l'image highline
  "Variateur De Vitesse 8400 TopLine": "/images/products/8400.webp",
  
  // Produits antérieurs
  "ECS": "/images/products/lenze-default.jpg",
  "9300": "/images/products/lenze-default.jpg",
}

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Industrial Pump XL-5000",
    category: "Pumps",
    subcategory: "High Pressure",
    description: "High-performance industrial pump designed for heavy-duty applications. Features corrosion-resistant materials and energy-efficient operation.",
    specifications: {
      "Power": "7.5 kW",
      "Max Flow Rate": "500 L/min",
      "Max Head": "50m",
      "Weight": "85 kg",
      "Material": "Stainless Steel 316",
      "Connection Size": "2 inch",
    },
    image: "/images/pump-xl5000.jpg",
    featured: true,
  },
  {
    id: "prod-002",
    name: "Conveyor Belt System CB-2000",
    category: "Conveyor Systems",
    subcategory: "Belt Conveyors",
    description: "Modular conveyor belt system for manufacturing and logistics. Customizable length and width with variable speed control.",
    specifications: {
      "Belt Width": "600mm",
      "Belt Material": "PVC",
      "Speed Range": "0.1-2.0 m/s",
      "Max Load": "200 kg/m",
      "Motor Power": "3 kW",
      "Control": "VFD with PLC interface",
    },
    image: "/images/conveyor-cb2000.jpg",
    featured: true,
  },
  {
    id: "prod-003",
    name: "Industrial Valve IV-3500",
    category: "Valves",
    subcategory: "Ball Valves",
    description: "High-pressure ball valve for industrial fluid control. Suitable for oil, gas, and chemical applications.",
    specifications: {
      "Size Range": "1/2 to 12 inch",
      "Pressure Rating": "PN16 to PN100",
      "Temperature Range": "-20°C to 200°C",
      "Body Material": "Carbon Steel / Stainless Steel",
      "Seat Material": "PTFE / RPTFE",
      "Connection": "Flanged / Threaded / Welded",
    },
    image: "/images/valve-iv3500.jpg",
    featured: false,
  },
  {
    id: "prod-004",
    name: "Hydraulic Press HP-8000",
    category: "Presses",
    subcategory: "Hydraulic",
    description: "Powerful hydraulic press for metal forming and assembly operations. Features precise pressure control and safety systems.",
    specifications: {
      "Force": "800 tons",
      "Stroke": "500mm",
      "Table Size": "1200 x 1200mm",
      "Power": "45 kW",
      "Oil Tank": "600 L",
      "Control System": "PLC with touchscreen",
    },
    image: "/images/press-hp8000.jpg",
    featured: true,
  },
  {
    id: "prod-005",
    name: "Industrial Mixer IM-1200",
    category: "Mixers",
    subcategory: "Agitators",
    description: "Versatile industrial mixer for liquid and semi-solid materials. Multiple impeller options for different mixing requirements.",
    specifications: {
      "Volume": "100 to 10,000 L",
      "Power": "1.5 to 75 kW",
      "Speed Range": "20-200 RPM",
      "Impeller Types": "Turbine / Propeller / Anchor",
      "Material": "Stainless Steel 304/316",
      "Mounting": "Top / Side / Bottom",
    },
    image: "/images/mixer-im1200.jpg",
    featured: false,
  },
  {
    id: "prod-006",
    name: "Compressor AC-7500",
    category: "Compressors",
    subcategory: "Rotary Screw",
    description: "Energy-efficient rotary screw compressor for industrial compressed air applications. Low noise and vibration design.",
    specifications: {
      "Free Air Delivery": "12.5 m³/min",
      "Working Pressure": "7.5 bar",
      "Motor Power": "75 kW",
      "Noise Level": "72 dB(A)",
      "Dimensions": "2200 x 1500 x 1800mm",
      "Weight": "1650 kg",
    },
    image: "/images/compressor-ac7500.jpg",
    featured: false,
  },
  {
    id: "prod-007",
    name: "Heat Exchanger HE-4000",
    category: "Heat Exchangers",
    subcategory: "Plate Type",
    description: "High-efficiency plate heat exchanger for industrial heating and cooling applications. Compact design with high heat transfer rates.",
    specifications: {
      "Heat Transfer Area": "40 to 400 m²",
      "Max Pressure": "25 bar",
      "Temperature Range": "-20°C to 180°C",
      "Plate Material": "Stainless Steel / Titanium",
      "Gasket Material": "NBR / EPDM / Viton",
      "Connection Size": "DN50 to DN200",
    },
    image: "/images/heat-exchanger-he4000.jpg",
    featured: true,
  },
  {
    id: "prod-008",
    name: "Industrial Filter IF-2500",
    category: "Filtration",
    subcategory: "Bag Filters",
    description: "Industrial bag filter system for liquid filtration. Multiple bag configuration for high flow rates and easy maintenance.",
    specifications: {
      "Flow Rate": "Up to 250 m³/h",
      "Filter Rating": "1 to 800 microns",
      "Housing Material": "Carbon Steel / Stainless Steel",
      "Bag Material": "Polypropylene / Polyester / Nylon",
      "Pressure Rating": "10 bar",
      "Connection Size": "DN50 to DN150",
    },
    image: "/images/filter-if2500.jpg",
    featured: false,
  },
];

// Fonction pour obtenir les produits statiques (qui ne sont pas chargés dynamiquement depuis des fichiers JSON)
export async function getStaticProducts(): Promise<Product[]> {
  return products;
}

// Fonction pour charger les produits Lenze depuis le fichier JSON
export async function getLenzeVariateurs(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'app', '(site)', 'products', 'json lenze', 'lenze_variateurs.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);

    const products = jsonData.map((item: any, index: number) => {
      // Générer un ID unique basé sur le nom du produit
      const id = `lenze-variateur-${index + 1}`;
      
      // Utiliser directement la catégorie du JSON comme identifiant de sous-catégorie
      // IMPORTANT: Ce champ sera utilisé pour le filtrage
      const subcategory = item.category;
      
      // Tableau pour stocker toutes les images
      let productImages: string[] = [];
      
      // Récupérer toutes les images du JSON
      if (item.images && item.images.length > 0) {
        // Filtrer les images pour exclure les SVG et les icônes non compatibles
        productImages = item.images
          .filter((img: any) => {
            // Exclure les icônes et les SVG
            return !img.url.includes('external-link.svg') && 
                   !img.url.includes('/Icons/') &&
                   img.url.includes('webp'); // Privilégier les images webp
          })
          .map((img: any) => img.url);
      }
      
      // Si aucune image valide n'a été trouvée pour certains produits, chercher spécifiquement dans les autres indices
      if (productImages.length === 0 && item.images && item.images.length > 0) {
        // Utiliser d'autres images disponibles, même si elles ne sont pas des webp
        productImages = item.images
          .filter((img: any) => {
            // Exclure uniquement les icônes et les SVG
            return !img.url.includes('external-link.svg') && 
                   !img.url.includes('/Icons/');
          })
          .map((img: any) => img.url);
      }
      
      // Utiliser l'image principale
      const image = productImages.length > 0 ? productImages[0] : "";
      
      // Préparer les spécifications en format plat
      const specifications: Record<string, any> = {};
      
      // Ajouter les points forts
      if (item.specs?.["Points forts"]) {
        specifications["Points forts"] = Array.isArray(item.specs["Points forts"]) 
          ? item.specs["Points forts"].join("\n") 
          : item.specs["Points forts"];
      }
      
      // Ajouter les caractéristiques techniques
      if (item.specs?.["Caractéristiques techniques"]?.["Caractéristiques et données techniques"]) {
        const techSpecs = item.specs["Caractéristiques techniques"]["Caractéristiques et données techniques"];
        for (const [key, value] of Object.entries(techSpecs)) {
          specifications[key] = value;
        }
      }
      
      // Ajouter la description
      if (item.specs?.Description) {
        specifications["Description"] = item.specs.Description;
      }
      
      // Construire l'objet Product
      return {
        id,
        name: item.name,
        category: "Variateurs et servovariateurs",
        subcategory, // Utiliser directement category du JSON comme subcategory
        jsonCategory: item.category, // Conserver la catégorie d'origine pour référence
        description: item.main_content || item.specs?.Description || "",
        specifications,
        image,
        featured: index < 3, // Les 3 premiers produits sont mis en avant
        // Utiliser toutes les images additionnelles filtrées
        additionalImages: productImages.slice(1),
        header_title: item.header_title, // Ajouter header_title depuis le JSON
        header_content: item.header_content // Ajouter header_content depuis le JSON
      };
    });
    
    return products;
  } catch (error) {
    return [];
  }
}

// Fonction pour charger les motoréducteurs Lenze depuis le fichier JSON
export async function getLenzeMotoreducteurs(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'app', '(site)', 'products', 'json lenze', 'lenze_motoreducteurs.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);

    const products = jsonData.map((item: any, index: number) => {
      // Générer un ID unique basé sur le nom du produit
      const id = `lenze-motoreducteur-${index + 1}`;
      
      // Map direct de la catégorie du JSON vers notre sous-catégorie
      const subcategory = item.category;

      // Tableau pour stocker toutes les images
      let productImages: string[] = [];
      
      // Récupérer toutes les images du JSON
      if (item.images && item.images.length > 0) {
        // Filtrer les images pour exclure les SVG et les icônes non compatibles
        productImages = item.images
          .filter((img: any) => {
            // Exclure les icônes et les SVG
            return !img.url.includes('external-link.svg') && 
                   !img.url.includes('/Icons/') &&
                   img.url.includes('webp'); // Privilégier les images webp
          })
          .map((img: any) => img.url);
      }
      
      // Si aucune image valide n'a été trouvée, chercher d'autres formats
      if (productImages.length === 0 && item.images && item.images.length > 0) {
        // Utiliser d'autres images disponibles
        productImages = item.images
          .filter((img: any) => {
            return !img.url.includes('external-link.svg') && 
                   !img.url.includes('/Icons/');
          })
          .map((img: any) => img.url);
      }
      
      // Utiliser l'image principale
      const image = productImages.length > 0 ? productImages[0] : "";
      
      // Préparer les spécifications en format plat
      const specifications: Record<string, any> = {};
      
      // Ajouter les points forts
      if (item.specs?.["Points forts"]) {
        specifications["Points forts"] = Array.isArray(item.specs["Points forts"]) 
          ? item.specs["Points forts"].join("\n") 
          : item.specs["Points forts"];
      }
      
      // Ajouter les caractéristiques techniques
      if (item.specs?.["Caractéristiques techniques"]?.["Caractéristiques et données techniques"]) {
        const techSpecs = item.specs["Caractéristiques techniques"]["Caractéristiques et données techniques"];
        for (const [key, value] of Object.entries(techSpecs)) {
          specifications[key] = value;
        }
      }
      
      // Ajouter la description
      if (item.specs?.Description) {
        specifications["Description"] = item.specs.Description;
      }
      
      // Construire l'objet Product
      return {
        id,
        name: item.name,
        category: "Motoréducteurs", // Catégorie principale
        subcategory, // Sous-catégorie spécifique depuis le JSON
        jsonCategory: item.category, // Conserver la catégorie d'origine pour référence
        description: item.main_content || item.specs?.Description || "",
        specifications,
        image,
        featured: index < 3, // Les 3 premiers produits sont mis en avant
        // Utiliser toutes les images additionnelles filtrées
        additionalImages: productImages.slice(1),
        header_title: item.header_title, // Ajouter header_title depuis le JSON
        header_content: item.header_content // Ajouter header_content depuis le JSON
      };
    });
    
    return products;
  } catch (error) {
    return [];
  }
}

// Fonction pour charger les moteurs Lenze depuis le fichier JSON
export async function getLenzeMoteurs(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'app', '(site)', 'products', 'json lenze', 'lenze_moteurs.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);

    const products = jsonData.map((item: any, index: number) => {
      // Générer un ID unique basé sur le nom du produit
      const id = `lenze-moteur-${index + 1}`;
      
      // Normaliser les sous-catégories pour s'assurer qu'elles correspondent aux trois sous-catégories demandées
      // Utiliser exactement les mêmes sous-catégories que dans types.ts
      let subcategory: string;
      
      // Faire une correspondance précise avec les valeurs du type LenzeMoteurSubCategory
      if (item.category === 'Moteurs triphasés') {
        subcategory = 'Moteurs triphasés';
      } else if (item.category === 'Servomoteurs') {
        subcategory = 'Servomoteurs';
      } else if (item.category === 'Produits antérieurs – Moteurs') {
        subcategory = 'Produits antérieurs – Moteurs'; // Utiliser exactement le même tiret (demi-cadratin)
      } else {
        // Si la catégorie ne correspond pas exactement, faire une correspondance moins stricte
        if (item.category.includes('triphasé') || item.category.toLowerCase().includes('triphase')) {
          subcategory = 'Moteurs triphasés';
        } else if (item.category.includes('servo') || item.category.toLowerCase().includes('servo')) {
          subcategory = 'Servomoteurs';
        } else if (item.category.includes('antérieur') || item.category.includes('ancien')) {
          subcategory = 'Produits antérieurs – Moteurs';
        } else {
          subcategory = 'Moteurs triphasés';
        }
      }

      // Tableau pour stocker toutes les images
      let productImages: string[] = [];
      
      // Récupérer toutes les images du JSON
      if (item.images && item.images.length > 0) {
        // Filtrer les images pour exclure les SVG et les icônes non compatibles
        productImages = item.images
          .filter((img: any) => {
            // Exclure les icônes et les SVG
            return !img.url.includes('external-link.svg') && 
                   !img.url.includes('/Icons/') &&
                   img.url.includes('webp'); // Privilégier les images webp
          })
          .map((img: any) => img.url);
      }
      
      // Si aucune image valide n'a été trouvée, chercher d'autres formats
      if (productImages.length === 0 && item.images && item.images.length > 0) {
        // Utiliser d'autres images disponibles
        productImages = item.images
          .filter((img: any) => {
            return !img.url.includes('external-link.svg') && 
                  !img.url.includes('/Icons/');
          })
          .map((img: any) => img.url);
      }
      
      // Utiliser l'image principale
      const image = productImages.length > 0 ? productImages[0] : "";
      
      // Préparer les spécifications en format plat
      const specifications: Record<string, any> = {};
      
      // Ajouter les points forts
      if (item.specs?.["Points forts"]) {
        specifications["Points forts"] = Array.isArray(item.specs["Points forts"]) 
          ? item.specs["Points forts"].join("\n") 
          : item.specs["Points forts"];
      }
      
      // Ajouter les caractéristiques techniques
      if (item.specs?.["Caractéristiques techniques"]?.["Caractéristiques et données techniques"]) {
        const techSpecs = item.specs["Caractéristiques techniques"]["Caractéristiques et données techniques"];
        for (const [key, value] of Object.entries(techSpecs)) {
          specifications[key] = value;
        }
      }
      
      // Ajouter la description
      if (item.specs?.Description) {
        specifications["Description"] = item.specs.Description;
      }
      
      // Construire l'objet Product
      return {
        id,
        name: item.name,
        category: "Moteurs", // Catégorie principale
        subcategory, // Sous-catégorie normalisée
        jsonCategory: item.category, // Conserver la catégorie d'origine pour référence
        description: item.main_content || item.specs?.Description || "",
        specifications,
        image,
        featured: index < 3, // Les 3 premiers produits sont mis en avant
        additionalImages: productImages.slice(1),
        header_title: item.header_title, // Ajouter header_title depuis le JSON
        header_content: item.header_content // Ajouter header_content depuis le JSON
      };
    });
    
    return products;
  } catch (error) {
    return [];
  }
}

// Fonction pour charger les réducteurs Lenze depuis le fichier JSON
export async function getLenzeReducteurs(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'app', '(site)', 'products', 'json lenze', 'lenze_reducteurs.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);

    const products = jsonData.map((item: any, index: number) => {
      // Générer un ID unique basé sur le nom du produit
      const id = `lenze-reducteur-${index + 1}`;
      
      // Normaliser les sous-catégories pour s'assurer qu'elles correspondent aux deux sous-catégories demandées
      // Utiliser exactement les mêmes sous-catégories que dans types.ts
      let subcategory: string;
      
      // Faire une correspondance précise avec les valeurs du type LenzeReducteurSubCategory
      if (item.category === 'Réducteurs') {
        subcategory = 'Réducteurs';
      } else if (item.category === 'Produits antérieurs – Réducteurs') {
        subcategory = 'Produits antérieurs – Réducteurs'; // Utiliser exactement le même tiret (demi-cadratin)
      } else {
        // Si la catégorie ne correspond pas exactement, faire une correspondance moins stricte
        if (item.category.includes('antérieur') || item.category.includes('ancien')) {
          subcategory = 'Produits antérieurs – Réducteurs';
        } else {
          subcategory = 'Réducteurs';
        }
      }

      // Tableau pour stocker toutes les images
      let productImages: string[] = [];
      
      // Récupérer toutes les images du JSON
      if (item.images && item.images.length > 0) {
        // Filtrer les images pour exclure les SVG et les icônes non compatibles
        productImages = item.images
          .filter((img: any) => {
            // Exclure les icônes et les SVG
            return !img.url.includes('external-link.svg') && 
                   !img.url.includes('/Icons/') &&
                   img.url.includes('webp'); // Privilégier les images webp
          })
          .map((img: any) => img.url);
      }
      
      // Si aucune image valide n'a été trouvée, chercher d'autres formats
      if (productImages.length === 0 && item.images && item.images.length > 0) {
        // Utiliser d'autres images disponibles
        productImages = item.images
          .filter((img: any) => {
            return !img.url.includes('external-link.svg') && 
                  !img.url.includes('/Icons/');
          })
          .map((img: any) => img.url);
      }
      
      // Utiliser l'image principale
      const image = productImages.length > 0 ? productImages[0] : "";
      
      // Préparer les spécifications en format plat
      const specifications: Record<string, any> = {};
      
      // Ajouter les points forts
      if (item.specs?.["Points forts"]) {
        specifications["Points forts"] = Array.isArray(item.specs["Points forts"]) 
          ? item.specs["Points forts"].join("\n") 
          : item.specs["Points forts"];
      }
      
      // Ajouter les caractéristiques techniques
      if (item.specs?.["Caractéristiques techniques"]?.["Caractéristiques et données techniques"]) {
        const techSpecs = item.specs["Caractéristiques techniques"]["Caractéristiques et données techniques"];
        for (const [key, value] of Object.entries(techSpecs)) {
          specifications[key] = value;
        }
      }
      
      // Ajouter la description
      if (item.specs?.Description) {
        specifications["Description"] = item.specs.Description;
      }
      
      // Traduire le titre et le contenu d'en-tête si c'est un produit antérieur (en anglais)
      const headerTitle = subcategory === 'Produits antérieurs – Réducteurs' && item.header_title && !item.header_title.includes('é') 
        ? `Réducteurs ${item.header_title.split(' ')[0]}` 
        : item.header_title;
      
      // Construire l'objet Product
      return {
        id,
        name: item.name,
        category: "Réducteurs", // Catégorie principale
        subcategory, // Sous-catégorie normalisée
        jsonCategory: item.category, // Conserver la catégorie d'origine pour référence
        description: item.main_content || item.specs?.Description || "",
        specifications,
        image,
        featured: index < 3, // Les 3 premiers produits sont mis en avant
        additionalImages: productImages.slice(1),
        header_title: headerTitle, // Ajouter header_title depuis le JSON, traduit si nécessaire
        header_content: item.header_content // Ajouter header_content depuis le JSON
      };
    });
    
    return products;
  } catch (error) {
    return [];
  }
}

// Fonction pour fusionner les produits Lenze avec les autres produits
export const getAllProducts = cache(async (): Promise<Product[]> => {
  try {
    const [staticProducts, lenzeVariateurs, lenzeMotoreducteurs, lenzeMoteurs, lenzeReducteurs] = await Promise.all([
      getStaticProducts(),
      getLenzeVariateurs(),
      getLenzeMotoreducteurs(),
      getLenzeMoteurs(),
      getLenzeReducteurs()
    ]);

    return [
      ...staticProducts, 
      ...lenzeVariateurs, 
      ...lenzeMotoreducteurs, 
      ...lenzeMoteurs,
      ...lenzeReducteurs,
      ...WAGO_INSTALLATION_PRODUCTS,
    ];
  } catch (error) {
    return getStaticProducts();
  }
});

export interface ProductQuery {
  category?: string;
  subcategory?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  brand?: string;
}

export interface ProductCatalogResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

async function getFilteredProducts(options: ProductQuery = {}): Promise<Product[]> {
  const allProducts = await getAllProducts();

  const isLenzeVariateursPage = options?.brand === 'lenze' && options?.category === 'Variateurs et servovariateurs';
  const isLenzeMotoreducteursPage = options?.brand === 'lenze' && options?.category === 'Motoréducteurs';
  const isLenzeMoteursPage = options?.brand === 'lenze' && options?.category === 'Moteurs';
  const isLenzeReducteursPage = options?.brand === 'lenze' && options?.category === 'Réducteurs';
  const isLenzeSpecialPage = isLenzeVariateursPage || isLenzeMotoreducteursPage || isLenzeMoteursPage || isLenzeReducteursPage;

  if (isLenzeSpecialPage) {
    let filteredProducts = allProducts.filter(product => 
      ['Variateurs et servovariateurs', 'Motoréducteurs', 'Moteurs', 'Réducteurs'].includes(product.category) || 
      product.name.toLowerCase().includes('lenze')
    );

    if (options?.category) {
      filteredProducts = filteredProducts.filter(product => product.category === options.category);
    }

    if (options?.subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === options.subcategory);
    }

    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    if (options?.featured !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.featured === options.featured);
    }

    if (isLenzeVariateursPage) {
      const subcategoryOrder = [
        'Variateurs de vitesse',
        'Servovariateurs',
        'Produits antérieurs - Variateurs de vitesse'
      ];

      filteredProducts.sort((a, b) => {
        const aSubcategoryIndex = subcategoryOrder.indexOf(a.subcategory);
        const bSubcategoryIndex = subcategoryOrder.indexOf(b.subcategory);

        if (aSubcategoryIndex !== bSubcategoryIndex) {
          return aSubcategoryIndex - bSubcategoryIndex;
        }

        return a.name.localeCompare(b.name);
      });
    } else if (isLenzeMotoreducteursPage) {
      const subcategoryOrder = [
        'Motoréducteurs triphasés',
        'Motoréducteurs triphasés avec variateurs de vitesse',
        'Servo-motoréducteurs'
      ];

      filteredProducts.sort((a, b) => {
        const aSubcategoryIndex = subcategoryOrder.indexOf(a.subcategory);
        const bSubcategoryIndex = subcategoryOrder.indexOf(b.subcategory);

        if (aSubcategoryIndex !== bSubcategoryIndex) {
          return aSubcategoryIndex - bSubcategoryIndex;
        }

        return a.name.localeCompare(b.name);
      });
    } else if (isLenzeMoteursPage) {
      const subcategoryOrder = [
        'Moteurs triphasés',
        'Servomoteurs',
        'Produits antérieurs – Moteurs'
      ];

      filteredProducts.sort((a, b) => {
        const aSubcategoryIndex = subcategoryOrder.indexOf(a.subcategory);
        const bSubcategoryIndex = subcategoryOrder.indexOf(b.subcategory);

        if (aSubcategoryIndex !== bSubcategoryIndex) {
          return aSubcategoryIndex - bSubcategoryIndex;
        }

        return a.name.localeCompare(b.name);
      });
    } else if (isLenzeReducteursPage) {
      const subcategoryOrder = [
        'Réducteurs',
        'Produits antérieurs – Réducteurs'
      ];

      filteredProducts.sort((a, b) => {
        const aSubcategoryIndex = subcategoryOrder.indexOf(a.subcategory);
        const bSubcategoryIndex = subcategoryOrder.indexOf(b.subcategory);

        if (aSubcategoryIndex !== bSubcategoryIndex) {
          return aSubcategoryIndex - bSubcategoryIndex;
        }

        return a.name.localeCompare(b.name);
      });
    } else {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filteredProducts;
  }

  let filteredProducts = allProducts;

  if (options?.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === options.category
    );
  }

  if (options?.subcategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.subcategory === options.subcategory
    );
  }

  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  if (options?.featured !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.featured === options.featured
    );
  }

  if (options?.brand) {
    filteredProducts = filteredProducts.filter((product) => {
      const productNameLower = product.name.toLowerCase();
      if (options.brand === 'wago') {
        return isWagoProduct(product);
      }

      if (options.brand === 'lenze') {
        return product.id.startsWith('lenze-') || productNameLower.includes(options.brand.toLowerCase());
      }

      return productNameLower.includes(options.brand!.toLowerCase());
    });
  }

  filteredProducts = sortProductResults(
    filteredProducts,
    options?.brand,
    options?.category,
  );

  return filteredProducts;
}

export async function getProductCatalog(
  options: ProductQuery = {},
): Promise<ProductCatalogResult> {
  const filteredProducts = await getFilteredProducts(options);

  if (
    options.brand === 'wago' &&
    options.category === WAGO_INSTALLATION_CATEGORY
  ) {
    return {
      products: filteredProducts,
      total: filteredProducts.length,
      page: 1,
      totalPages: 1,
    };
  }

  return paginateProducts(filteredProducts, options?.page);
}

export async function getProducts(options?: ProductQuery): Promise<Product[]> {
  const filteredProducts = await getFilteredProducts(options);
  if (options?.page === undefined) return filteredProducts;

  if (
    options.brand === 'wago' &&
    options.category === WAGO_INSTALLATION_CATEGORY
  ) {
    return filteredProducts;
  }

  return paginateProducts(filteredProducts, options?.page).products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const allProducts = await getAllProducts();
  return allProducts.find((product) => product.id === id);
}

export async function getProductCategories(brand?: string): Promise<string[]> {
  const matchingProducts = brand
    ? await getFilteredProducts({ brand })
    : await getAllProducts();
  const categories = new Set(matchingProducts.map((product) => product.category));
  return Array.from(categories);
}

export async function getProductSubcategories(
  category: string
): Promise<string[]> {
  const allProducts = await getAllProducts();
  const subcategories = new Set(
    allProducts
      .filter((product) => product.category === category)
      .map((product) => product.subcategory)
  );
  return Array.from(subcategories);
}
