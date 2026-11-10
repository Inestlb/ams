export const metadata = {
  title: 'Société | AMS Algérie',
  description: 'Découvrez AMS Algérie, spécialiste des solutions industrielles en automatisme, motorisation et connectique depuis 2006.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#f4f0e8] text-[#0b2f4f]">
      <section className="flex min-h-[calc(100dvh-5rem)] w-full items-center justify-center py-20 md:min-h-[calc(100dvh-6rem)] md:py-28">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <h1 className="max-w-md text-4xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-6xl">
              Une expertise industrielle construite dans la durée.
            </h1>

            <div className="space-y-6 text-lg leading-relaxed text-[#39495a]">
              <p>
                Fondée en 2006, AMS Algérie est une entreprise familiale qui s'est imposée comme
                un acteur national de référence dans la distribution de solutions
                industrielles en Algérie.
              </p>
              <p>
                Spécialisée dans l'automatisme, la motorisation et le process industriel, AMS Algérie
                collabore avec des partenaires de renom comme IFM Electronic, Lenze et WAGO afin de
                fournir aux industriels des équipements performants, disponibles et adaptés à leurs besoins.
              </p>
              <p>
                L'entreprise poursuit son développement avec une approche simple : comprendre les contraintes
                du terrain, proposer des composants fiables et accompagner les clients dans l'optimisation de
                leurs lignes de production.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
