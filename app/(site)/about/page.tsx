export const metadata = {
  title: 'Société | UTC Industrie',
  description: 'Découvrez UTC Industrie, spécialiste des solutions industrielles en automatisme, motorisation et connectique depuis 2006.',
};

export default function AboutPage() {
  return (
    <main className="bg-[#f4f0e8] text-[#0b2f4f]">
      <section className="relative overflow-hidden bg-[#0b2f4f] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b2f4f_0%,#0f3d64_58%,#082742_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#e47925]/50" />

        <div className="relative flex justify-center w-full">
          <div className="w-full max-w-[1600px] px-6 py-14 md:px-12 md:py-18">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#e47925] md:text-sm">
                UTC Industrie
              </p>
              <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
                Société
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d7e2eb] md:text-lg">
                Depuis 2006, UTC Industrie accompagne les industriels avec des équipements fiables,
                des partenaires reconnus et une expertise terrain orientée performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center w-full py-20 md:py-28">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <aside className="lg:pt-2">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#e47925]">
                Parcours
              </p>
              <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-6xl">
                Une expertise industrielle construite dans la durée.
              </h2>
            </aside>

            <div className="space-y-6 text-lg leading-relaxed text-[#39495a]">
              <p>
                Fondée en 2006, UTC Industrie est une entreprise familiale qui s'est imposée comme
                un acteur national de référence dans la distribution de solutions
                industrielles en Algérie.
              </p>
              <p>
                Spécialisée dans l'automatisme, la motorisation et le process industriel, UTC Industrie
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

    </main>
  );
}
