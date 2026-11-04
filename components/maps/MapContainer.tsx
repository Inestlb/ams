import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl } from '@/lib/maps';

interface MapContainerProps {
  markerTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}

export default function MapContainer({
  markerTitle = 'UTC Industrie',
  address = '450 Rue Baden Powell, Espace Optimum, 34000 Montpellier',
  phone = '+1 (234) 567-890',
  email = 'info@industrialexport.com',
  latitude,
  longitude
}: MapContainerProps) {
  const mapsUrl = getGoogleMapsUrl(address);
  const embedUrl = getGoogleMapsEmbedUrl(address, latitude, longitude);
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f4f7f8]">
      <iframe
        title={`${markerTitle} map`}
        src={embedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-[1] h-24 w-36 bg-[#f4f7f8]" />
      <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-md bg-white/95 px-3 py-2 text-xs text-[#0b2f4f] shadow-md backdrop-blur">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#e47925]" />
          <div className="min-w-0">
            <p className="font-semibold leading-tight">{markerTitle}</p>
            <p className="mt-1 leading-relaxed text-[#39495a]">{address}</p>
            <div className="mt-2 flex flex-col gap-1.5 border-t border-[#0b2f4f]/10 pt-2">
              <a href={phoneHref} className="inline-flex items-center gap-2 leading-tight text-[#39495a] transition-colors hover:text-[#e47925]">
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-[#e47925]" />
                {phone}
              </a>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 leading-tight text-[#39495a] transition-colors hover:text-[#e47925]">
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-[#e47925]" />
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-none bg-[#0b2f4f] px-3 py-2 text-xs font-medium text-white shadow-md transition-colors hover:bg-[#e47925]"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Ouvrir dans Google Maps
      </a>
    </div>
  );
}
