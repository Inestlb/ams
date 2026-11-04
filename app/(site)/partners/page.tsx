import Image from 'next/image';

export const metadata = {
  title: 'Partenaires | UTC Industrie',
  description: 'Découvrez les partenaires industriels UTC Industrie : Lenze, WAGO et IFM.',
};

const partners = [
  {
    id: 'lenze',
    name: 'Lenze',
    logo: '/images/logo-Lenze.svg',
    width: 170,
    height: 52,
    description:
      'Spécialiste mondial des solutions d’entraînement et d’automatisation pour machines et équipements industriels.',
  },
  {
    id: 'wago',
    name: 'WAGO',
    logo: '/images/logo-WAGO.svg',
    width: 174,
    height: 65,
    description:
      'Référence des technologies de connexion électrique, d’interfaces électroniques et d’automatisation industrielle.',
  },
  {
    id: 'ifm',
    name: 'IFM',
    logo: '/images/logo-ifm.svg',
    width: 132,
    height: 132,
    description:
      'Fabricant de capteurs, systèmes de contrôle et solutions de digitalisation pour des process industriels fiables.',
  },
];

export default function PartnersPage() {
  return (
    <main className="bg-[#f4f0e8] text-[#0b2f4f]">
      <section className="flex justify-center w-full pt-12 pb-20 md:pt-14 md:pb-28">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <aside>
              <h1 className="max-w-md text-4xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-6xl">
                Partenaires
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#39495a] md:text-lg">
                UTC Industrie travaille avec des fabricants reconnus pour proposer des composants fiables,
                disponibles et adaptés aux contraintes des environnements industriels.
              </p>
            </aside>

            <div className="space-y-5">
              {partners.map((partner) => (
                <article
                  key={partner.id}
                  className="grid gap-6 rounded-[1.5rem] border border-[#0b2f4f]/10 bg-white/70 p-6 md:grid-cols-[13rem_1fr] md:p-7"
                >
                  <div className="flex min-h-36 items-center justify-center rounded-[1.1rem] bg-[#f8f5ef] p-6">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                      className="max-h-24 w-auto object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#0b2f4f]">
                      {partner.name}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-[#39495a]">
                      {partner.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
