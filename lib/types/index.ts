export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  jsonCategory?: string; // Catégorie d'origine du JSON
  description: string;
  specifications: Record<string, unknown>;
  image: string;
  featured: boolean;
  additionalImages?: string[];
  header_title?: string; // Titre d'affichage spécifique
  header_content?: string; // Contenu d'en-tête spécifique
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ProductFilterOptions {
  category?: string;
  subcategory?: string;
  search?: string;
  page?: number;
  brand?: string;
}

// Types pour les catégories de produits IFM
export const IFM_CATEGORIES = {
  'Détecteur Inductifs': 'Détecteur Inductifs',
  'Détecteurs Capacitifs': 'Détecteurs Capacitifs',
  'Cellule Opto': 'Cellule Opto',
  'Détecteurs à ultrasons': 'Détecteurs à ultrasons',
  'Détecteurs pour vannes': 'Détecteurs pour vannes',
  'Détecteurs pour vérins': 'Détecteurs pour vérins',
  'Capteurs de pression / Capteurs de dépression': 'Capteurs de pression / Capteurs de dépression',
  'Capteurs de niveau': 'Capteurs de niveau',
  'Capteurs de débit / débitmètres': 'Capteurs de débit / débitmètres',
  'Capteurs de température': 'Capteurs de température',
  'IO LINK': 'IO LINK',
  'Communication Industrielle ASI BUS': 'Communication Industrielle ASI BUS',
  'Technologie de sécurité': 'Technologie de sécurité',
  'Technologie de connexion': 'Technologie de connexion',
} as const;

export type IFMCategory = keyof typeof IFM_CATEGORIES;

// Types pour les catégories de produits Lenze
export type LenzeCategory = 
  | 'Variateurs et servovariateurs'
  | 'Moteurs'
  | 'Motoréducteurs'
  | 'Réducteurs';

export const LENZE_CATEGORIES: Record<LenzeCategory, string> = {
  'Variateurs et servovariateurs': 'Variateurs et servovariateurs',
  'Moteurs': 'Moteurs',
  'Motoréducteurs': 'Motoréducteurs',
  'Réducteurs': 'Réducteurs'
};

// Types pour les catégories de produits WAGO
export type WAGOCategory = 
  | 'Bornes sur rail'
  | 'Système d\'alimentation'
  | 'Bornes d\'installation';

export const WAGO_CATEGORIES: Record<WAGOCategory, string> = {
  'Bornes sur rail': 'Bornes sur rail',
  'Système d\'alimentation': 'Système d\'alimentation',
  'Bornes d\'installation': 'Bornes d\'installation'
};

// Types pour les sous-catégories de Variateurs et servovariateurs Lenze
export type LenzeVariateurSubCategory = 
  | 'Variateurs de vitesse'
  | 'Servovariateurs'
  | 'Produits antérieurs - Variateurs de vitesse';

export const LENZE_VARIATEUR_SUBCATEGORIES: Record<LenzeVariateurSubCategory, string> = {
  'Variateurs de vitesse': 'Variateurs de vitesse',
  'Servovariateurs': 'Servovariateurs',
  'Produits antérieurs - Variateurs de vitesse': 'Produits antérieurs - Variateurs de vitesse'
};

// Types pour les sous-catégories de Motoréducteurs Lenze
export type LenzeMotoreducteurSubCategory = 
  | 'Motoréducteurs triphasés'
  | 'Motoréducteurs triphasés avec variateurs de vitesse'
  | 'Servo-motoréducteurs';

export const LENZE_MOTOREDUCTEUR_SUBCATEGORIES: Record<LenzeMotoreducteurSubCategory, string> = {
  'Motoréducteurs triphasés': 'Motoréducteurs triphasés',
  'Motoréducteurs triphasés avec variateurs de vitesse': 'Motoréducteurs triphasés avec variateurs de vitesse',
  'Servo-motoréducteurs': 'Servo-motoréducteurs'
};

// Types pour les sous-catégories de Moteurs Lenze
export type LenzeMoteurSubCategory = 
  | 'Moteurs triphasés'
  | 'Servomoteurs'
  | 'Produits antérieurs – Moteurs';

export const LENZE_MOTEUR_SUBCATEGORIES: Record<LenzeMoteurSubCategory, string> = {
  'Moteurs triphasés': 'Moteurs triphasés',
  'Servomoteurs': 'Servomoteurs',
  'Produits antérieurs – Moteurs': 'Produits antérieurs – Moteurs'
};

// Types pour les sous-catégories de Réducteurs Lenze
export type LenzeReducteurSubCategory = 
  | 'Réducteurs'
  | 'Produits antérieurs – Réducteurs';

export const LENZE_REDUCTEUR_SUBCATEGORIES: Record<LenzeReducteurSubCategory, string> = {
  'Réducteurs': 'Réducteurs',
  'Produits antérieurs – Réducteurs': 'Produits antérieurs – Réducteurs'
};
