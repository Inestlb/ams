export function getGoogleMapsUrl(address: string) {
  const encodedAddress = encodeURIComponent(address);

  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}

export function getGoogleMapsEmbedUrl(address: string, latitude?: number, longitude?: number) {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    return `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
  }

  const encodedAddress = encodeURIComponent(address);

  return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
}
