import ContactForm from '@/components/forms/ContactForm';
import MapContainer from '@/components/maps/MapContainer';

export const metadata = {
  title: 'Contactez-nous | UTC Industrie',
  description: 'Prenez contact avec notre équipe pour toute demande concernant nos produits industriels',
};

const contactLocation = {
  address: '450 Rue Baden Powell, Espace Optimum, 34000 Montpellier',
  phone: '+1 (234) 567-890',
  email: 'info@industrialexport.com',
  latitude: 43.6102441,
  longitude: 3.9086065,
};

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] py-8 pb-16">
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center w-full">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="mb-8 text-center w-full">
            <h1 className="text-3xl font-bold mb-3 text-center"><span className="text-orange-500">Contactez</span>-nous</h1>
            <p className="text-[#39495a] max-w-2xl mx-auto text-sm">
              Vous avez des questions sur nos produits ou services ? Notre équipe est là pour vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="h-full">
              <ContactForm hideTitle className="h-full" />
            </div>

            <div className="relative h-full min-h-[480px] overflow-hidden rounded-2xl border border-[#0b2f4f]/10 bg-white">
              <div className="h-full">
                <MapContainer
                  markerTitle="UTC Industrie - Espace Optimum"
                  address={contactLocation.address}
                  phone={contactLocation.phone}
                  email={contactLocation.email}
                  latitude={contactLocation.latitude}
                  longitude={contactLocation.longitude}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
