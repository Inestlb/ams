import assert from 'node:assert/strict';

const typesModuleUrl = new URL('../types/index.ts', import.meta.url).href;
const { IFM_CATEGORIES } = await import(typesModuleUrl) as {
  IFM_CATEGORIES: Record<string, string>;
};

const expectedCategories = [
  'Détecteur Inductifs',
  'Détecteurs Capacitifs',
  'Cellule Opto',
  'Détecteurs à ultrasons',
  'Détecteurs pour vannes',
  'Détecteurs pour vérins',
  'Capteurs de pression / Capteurs de dépression',
  'Capteurs de niveau',
  'Capteurs de débit / débitmètres',
  'Capteurs de température',
  'IO LINK',
  'Communication Industrielle ASI BUS',
  'Technologie de sécurité',
  'Technologie de connexion',
];

assert.deepEqual(
  Object.values(IFM_CATEGORIES),
  expectedCategories,
  'IFM categories should match the approved labels and order',
);
