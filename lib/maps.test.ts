import assert from 'node:assert/strict';
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl } from './maps.ts';

const address = '450 Rue Baden Powell, Espace Optimum, 34000 Montpellier';
const encodedAddress = encodeURIComponent(address);

assert.equal(
  getGoogleMapsUrl(address),
  `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
);

assert.equal(
  getGoogleMapsEmbedUrl(address, 43.6102441, 3.9086065),
  'https://www.google.com/maps?q=43.6102441,3.9086065&z=16&output=embed'
);
