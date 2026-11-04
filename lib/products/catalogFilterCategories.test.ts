import assert from 'node:assert/strict';
import { getCatalogBrandCategories } from './catalogFilterCategories.ts';

assert.deepEqual(
  getCatalogBrandCategories('ifm', ['unrelated']),
  [
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
  ],
  'The catalog should expose the complete IFM category list after selecting IFM',
);

assert.deepEqual(
  getCatalogBrandCategories('wago', ['unrelated']),
  ['Bornes sur rail', "Système d'alimentation", "Bornes d'installation"],
  'The catalog should expose the complete WAGO category list after selecting WAGO',
);

assert.deepEqual(
  getCatalogBrandCategories('lenze', ['Variateurs et servovariateurs', 'Moteurs']),
  ['Variateurs et servovariateurs', 'Moteurs'],
  'Lenze should keep its existing catalog category source',
);
