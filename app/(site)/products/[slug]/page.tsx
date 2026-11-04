import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, ArrowRight } from 'lucide-react';
import { getProductById, getProducts, extraImages } from '@/data/products';
import { Metadata } from 'next';
import ProductGallery from '@/components/products/ProductGallery';
import { isWagoProduct } from '@/lib/products/wagoInstallationProducts';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    return {
      title: 'Produit Non Trouvé',
    };
  }

  const displayTitle = product.header_title || product.name;

  return {
    title: `${displayTitle} | Entreprise d'Exportation Industrielle`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    notFound();
  }

  const displayTitle = product.header_title || product.name;
  const isWagoInstallationProduct = isWagoProduct(product);

  const relatedProducts = isWagoInstallationProduct
    ? []
    : await getProducts({
        category: product.category,
      });

  const filteredRelatedProducts = relatedProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const additionalImages = product.additionalImages?.length
    ? product.additionalImages
    : extraImages[product.id] ?? [];
  const productsHref = isWagoInstallationProduct
    ? `/products?brand=wago&category=${encodeURIComponent(product.category)}`
    : `/products?category=${encodeURIComponent(product.category)}&brand=lenze`;

  return (
    <div className="bg-white">
      <div className="bg-[#0b2f4f] pt-2 md:pt-3">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-2 pb-4">
          <nav className="flex items-center flex-wrap gap-y-1 text-[13px] text-[#a8c4db]">
            <Link href="/" className="text-white hover:text-[#e47925] transition-colors">
              Accueil
            </Link>
            <span className="mx-2 text-[#6b98b8]">/</span>
            <Link href="/products" className="text-white hover:text-[#e47925] transition-colors">
              Produits
            </Link>
            <span className="mx-2 text-[#6b98b8]">/</span>
            <Link
              href={productsHref}
              className="text-white hover:text-[#e47925] transition-colors"
            >
              {product.category}
            </Link>
            <span className="mx-2 text-[#6b98b8]">/</span>
            <span className="text-[#e47925] font-medium">{displayTitle}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        <Link
          href={productsHref}
          className="inline-flex items-center text-[13px] text-[#0b2f4f] hover:text-[#e47925] mb-8 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux produits
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {!product.image ? (
              <div className="aspect-square bg-[#f8f9fa] border border-[#cacdcf] rounded flex items-center justify-center max-w-[400px] mx-auto">
                <span className="text-[#6b7280] text-4xl">{displayTitle.charAt(0)}</span>
              </div>
            ) : (
              <ProductGallery
                mainImage={product.image}
                additionalImages={additionalImages}
                productName={displayTitle}
              />
            )}
          </div>

          <div>
            <h1 className="text-xl font-semibold text-[#0b2f4f] mb-4">{displayTitle}</h1>

            <div className="text-[15px] text-[#6b7280] leading-relaxed mb-6">
              {product.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>

            {Object.keys(product.specifications).length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-[#0b2f4f]">Spécifications</h2>
                  <div className="h-px flex-1 bg-[#e47925] opacity-40" />
                </div>
                <div className="border border-[#cacdcf] overflow-hidden">
                  <dl>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div
                        key={key}
                        className={`py-3 px-5 grid grid-cols-3 gap-4 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}`}
                      >
                        <dt className="text-[13px] text-[#0b2f4f] font-medium">{key}</dt>
                        <dd className="text-[13px] text-[#34383c] col-span-2">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {!isWagoInstallationProduct && (
              <Button
                asChild
                className="rounded-none bg-[#e47925] text-white hover:bg-[#0b2f4f] px-6 py-3 text-[13px] font-medium border border-[#e47925] hover:border-[#0b2f4f]"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Demander des Informations
                </Link>
              </Button>
            )}
          </div>
        </div>

        {filteredRelatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-[#0b2f4f]">Produits Associés</h2>
              <div className="h-px flex-1 bg-[#e47925] opacity-40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => {
                const relatedDisplayTitle = relatedProduct.header_title || relatedProduct.name;

                return (
                  <div
                    key={relatedProduct.id}
                    className="border border-[#cacdcf] bg-white overflow-hidden group/related hover:border-[#0b2f4f]"
                  >
                    <div className="h-56 w-full flex items-center justify-center bg-[#0b2f4f]">
                      {!relatedProduct.image ? (
                        <span className="text-white/25 text-3xl font-bold">{relatedDisplayTitle.charAt(0)}</span>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#f8f9fa]">
                          <Image
                            src={relatedProduct.image}
                            alt={relatedDisplayTitle}
                            width={400}
                            height={300}
                            sizes="(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 100vw"
                            className="object-contain w-auto h-full max-w-full"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-[15px] font-semibold text-[#0b2f4f] line-clamp-1 mb-2 group-hover/related:text-[#e47925]">
                        {relatedDisplayTitle}
                      </h3>
                      <p className="text-[13px] text-[#6b7280] line-clamp-2 mb-4">
                        {relatedProduct.description}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-none w-full py-4 text-[13px] text-[#0b2f4f] border-[#0b2f4f] hover:bg-[#e47925] hover:text-white hover:border-[#e47925]"
                      >
                        <Link href={`/products/${relatedProduct.id}`}>
                          Voir les détails
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
