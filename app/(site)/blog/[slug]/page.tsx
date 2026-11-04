import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import ReadMoreLabel from '@/components/blog/ReadMoreLabel';

// In a real application, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    slug: 'new-product-line-announcement',
    title: 'Annonce de Notre Nouvelle Gamme de Pompes Industrielles',
    excerpt: 'Nous sommes ravis de présenter notre dernière gamme de pompes industrielles à haute efficacité conçues pour les environnements exigeants.',
    date: '15 juin 2023',
    author: 'Robert Johnson',
    authorRole: 'Directeur Général',
    category: 'Actualités Produits',
    imageUrl: '/images/blog/pumps.jpg',
    content: `
      <p>Nous sommes ravis d'annoncer le lancement de notre nouvelle gamme de pompes industrielles, spécialement conçues pour les environnements et applications exigeants. Après des années de recherche et développement, nous avons créé une gamme de pompes qui établit de nouvelles normes en matière d'efficacité, de durabilité et de performance.</p>

      <h2>Caractéristiques Principales</h2>

      <p>Notre nouvelle gamme de pompes industrielles comprend plusieurs fonctionnalités innovantes :</p>

      <ul>
        <li><strong>Efficacité Énergétique Améliorée :</strong> Jusqu'à 30% plus économe en énergie que les modèles précédents, contribuant à réduire les coûts opérationnels.</li>
        <li><strong>Matériaux Avancés :</strong> Construites avec des alliages résistants à la corrosion qui prolongent la durée de vie dans des environnements difficiles.</li>
        <li><strong>Surveillance Intelligente :</strong> Capteurs intégrés et connectivité IoT pour la surveillance des performances en temps réel et la maintenance prédictive.</li>
        <li><strong>Conception Modulaire :</strong> Composants facilement réparables qui réduisent le temps et les coûts de maintenance.</li>
        <li><strong>Applications Polyvalentes :</strong> Adaptées à une large gamme d'industries, notamment le pétrole et le gaz, l'exploitation minière, le traitement chimique et le traitement de l'eau.</li>
      </ul>

      <h2>Performance de Pointe</h2>

      <p>Lors de tests approfondis sur le terrain, nos nouvelles pompes ont démontré des performances exceptionnelles :</p>

      <ul>
        <li>Réduction de la consommation d'énergie de 27% en moyenne</li>
        <li>Intervalles de maintenance prolongés jusqu'à 40%</li>
        <li>Diminution des temps d'arrêt de 35% par rapport aux normes de l'industrie</li>
        <li>Amélioration des débits de 15-20% selon le modèle</li>
      </ul>

      <p>Ces améliorations se traduisent directement par des économies de coûts et une productivité accrue pour nos clients.</p>

      <h2>Disponibilité Mondiale</h2>

      <p>La nouvelle gamme de pompes sera disponible dans le monde entier à partir du 1er juillet 2023. Notre réseau de distribution mondial assure une livraison rapide et un support local dans plus de 50 pays.</p>

      <p>Pour les clients disposant d'équipements existants, nous proposons des packages de mise à niveau complets et des options de reprise pour faciliter la transition vers notre nouvelle technologie.</p>

      <h2>Engagement envers la Durabilité</h2>

      <p>Conformément à nos objectifs de développement durable, la nouvelle gamme de pompes a été conçue en tenant compte de l'impact environnemental. L'efficacité énergétique améliorée réduit l'empreinte carbone, tandis que la durée de vie prolongée et les composants recyclables minimisent les déchets.</p>

      <h2>En Savoir Plus</h2>

      <p>Nous vous invitons à explorer notre nouvelle gamme de pompes industrielles et à découvrir comment elle peut bénéficier à vos opérations. Notre équipe d'experts est prête à fournir des informations détaillées, des spécifications techniques et des solutions personnalisées pour vos besoins spécifiques.</p>

      <p>Contactez notre équipe commerciale ou consultez notre catalogue de produits pour en savoir plus sur cet ajout passionnant à notre portefeuille de produits.</p>
    `,
    relatedPosts: [2, 5, 6]
  },
  {
    id: 2,
    slug: 'industry-trends-2023',
    title: 'Principales Tendances des Équipements Industriels pour 2023',
    excerpt: 'Explorez les dernières tendances qui façonnent le marché des équipements industriels et leur impact potentiel sur votre entreprise.',
    date: '22 mai 2023',
    author: 'Sarah Chen',
    authorRole: 'Directrice des Opérations',
    category: 'Perspectives Industrielles',
    imageUrl: '/images/blog/trends.jpg',
    content: `<p>Le secteur des équipements industriels continue d'évoluer rapidement, porté par les avancées technologiques, l'évolution des demandes du marché et les facteurs économiques mondiaux. Cet article explore les principales tendances qui façonnent l'industrie en 2023.</p>`,
    relatedPosts: [1, 3, 4]
  },
  {
    id: 3,
    slug: 'sustainable-manufacturing',
    title: 'Fabrication Durable : L\'Avenir de l\'Industrie',
    excerpt: 'Comment les pratiques durables transforment la fabrication et créent de nouvelles opportunités pour les entreprises.',
    date: '10 avril 2023',
    author: 'Michael Rodriguez',
    authorRole: 'Directeur Technique',
    category: 'Durabilité',
    imageUrl: '/images/blog/sustainability.jpg',
    content: `<p>La durabilité n'est plus seulement un mot à la mode dans le secteur manufacturier—elle devient un impératif commercial fondamental. Cet article examine comment les pratiques durables remodèlent les opérations industrielles.</p>`,
    relatedPosts: [2, 4, 5]
  },
  {
    id: 4,
    slug: 'international-trade-challenges',
    title: 'Naviguer dans les Défis du Commerce International en 2023',
    excerpt: 'Un guide complet pour surmonter les obstacles courants dans le commerce mondial d\'équipements industriels.',
    date: '5 mars 2023',
    author: 'Robert Johnson',
    authorRole: 'Directeur Général',
    category: 'Commerce Mondial',
    imageUrl: '/images/blog/trade.jpg',
    content: `<p>Le commerce international d'équipements industriels présente des défis uniques, de la conformité réglementaire aux complexités logistiques. Ce guide fournit des stratégies pratiques pour réussir sur les marchés mondiaux.</p>`,
    relatedPosts: [2, 3, 6]
  },
  {
    id: 5,
    slug: 'maintenance-best-practices',
    title: 'Meilleures Pratiques pour l\'Entretien des Équipements Industriels',
    excerpt: 'Conseils d\'experts pour prolonger la durée de vie de vos équipements industriels et minimiser les temps d\'arrêt.',
    date: '18 février 2023',
    author: 'Michael Rodriguez',
    authorRole: 'Directeur Technique',
    category: 'Maintenance',
    imageUrl: '/images/blog/maintenance.jpg',
    content: `<p>Des stratégies de maintenance efficaces sont essentielles pour maximiser la durée de vie des équipements et minimiser les temps d'arrêt coûteux. Cet article partage des recommandations d'experts pour l'entretien des équipements industriels.</p>`,
    relatedPosts: [1, 3, 6]
  },
  {
    id: 6,
    slug: 'case-study-mining',
    title: 'Étude de Cas : Solutions d\'Équipement pour les Opérations Minières',
    excerpt: 'Comment nos solutions d\'équipement personnalisées ont aidé une importante exploitation minière à améliorer son efficacité de 35%.',
    date: '30 janvier 2023',
    author: 'Sarah Chen',
    authorRole: 'Directrice des Opérations',
    category: 'Étude de Cas',
    imageUrl: '/images/blog/mining.jpg',
    content: `<p>Cette étude de cas examine comment nos solutions d'équipement sur mesure ont transformé les opérations d'une grande entreprise minière, entraînant des améliorations significatives d'efficacité et des économies de coûts.</p>`,
    relatedPosts: [1, 4, 5]
  },
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: 'Article Non Trouvé',
      description: 'L\'article de blog demandé n\'a pas pu être trouvé.',
    };
  }

  return {
    title: `${post.title} | Blog de l'Entreprise d'Exportation Industrielle`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.relatedPosts.map(id =>
    blogPosts.find(post => post.id === id)
  ).filter(Boolean);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-1 sm:px-2 lg:px-3 max-w-[1400px]">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-300 hover:text-white mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au Blog
            </Link>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Tag className="h-4 w-4 mr-2" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-1 sm:px-2 lg:px-3 max-w-[1400px]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500">Image à la une</p>
              {/* In a real application, you would use an actual image */}
              {/* <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={600}
                className="rounded-lg w-full h-full object-cover"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-1 sm:px-2 lg:px-3 max-w-[1400px]">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Share Links */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-4">Partager cet article :</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-none">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Partager</span>
                  </Button>
                  {/* In a real application, you would add actual social media sharing buttons */}
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{post.author}</h3>
                  <p className="text-gray-600">{post.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-1 sm:px-2 lg:px-3 max-w-[1400px]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Articles Associés</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <div key={relatedPost?.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Image</p>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {relatedPost?.category}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {relatedPost?.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{relatedPost?.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedPost?.excerpt}
                    </p>
                    <Link
                      href={`/blog/${relatedPost?.slug}`}
                      className="text-primary font-medium flex items-center hover:underline"
                    >
                      <ReadMoreLabel />
                      <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/blog">
                  Voir Tous les Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
