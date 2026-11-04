import { NextResponse } from 'next/server';
import { getProducts, getProductById, getProductCategories } from '@/data/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const search = searchParams.get('q');
    const featured = searchParams.get('featured');
    const page = searchParams.get('page');
    const brand = searchParams.get('brand');

    // If an ID is provided, return a single product
    if (id) {
      const product = await getProductById(id);

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(product);
    }

    // If 'categories' is requested, return all categories
    if (searchParams.get('categories') === 'true') {
      const categories = await getProductCategories();
      return NextResponse.json(categories);
    }

    // Otherwise, return filtered products
    const products = await getProducts({
      category: category || undefined,
      search: search || undefined,
      featured: featured ? featured === 'true' : undefined,
      page: page ? parseInt(page) : undefined,
      brand: brand || undefined,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
