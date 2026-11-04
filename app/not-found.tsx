import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container px-4 py-16 text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Non Trouvée</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          La page que vous recherchez a peut-être été supprimée, son nom a changé,
          ou elle est temporairement indisponible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour à l'Accueil
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">
              Parcourir les Produits
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Contacter le Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
