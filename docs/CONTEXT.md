# Industrial Export Company Website - Developer Guide

## Table of Contents
1. [Project Setup](#project-setup)
2. [Core Dependencies](#core-dependencies)
3. [Project Structure](#project-structure)
4. [Implementation Guide](#implementation-guide)
5. [Component Development](#component-development)
6. [Styling Guidelines](#styling-guidelines)
7. [Data Management](#data-management)


## Core Dependencies

- **Next.js**: React framework with built-in routing and API routes
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form validation library
- **Zod**: TypeScript-first schema validation
- **Fuse.js**: Lightweight fuzzy-search library

## Project Structure
```
├── app/
│   ├── (site)/
│   │   ├── page.tsx                # Home page
│   │   ├── products/
│   │   │   ├── page.tsx            # Products page
│   │   │   └── [slug]/page.tsx     # Product detail page
│   │   ├── about/
│   │   │   └── page.tsx            # About page
│   │   ├── partners/
│   │   │   └── page.tsx            # Partners page
│   │   └── contact/
│   │       └── page.tsx            # Contact page
│   ├── api/
│   │   ├── products/
│   │   │   └── route.ts            # Products API
│   │   └── contact/
│   │       └── route.ts            # Contact form API
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilter.tsx
│   │   └── SearchBar.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── forms/
│       └── ContactForm.tsx
├── lib/
│   ├── hooks/
│   │   ├── useSearch.ts
│   │   └── useProducts.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── types/
│       └── index.ts                # Type definitions
├── data/
│   ├── products.ts
│   └── partners.ts
├── public/
│   ├── images/
│   └── favicon.ico
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Implementation Guide

### Phase 1: Basic Setup & Layout (2-3 days)
1. **Set up Next.js App Router**
   ```typescript
   // app/layout.tsx
   import { Inter } from 'next/font/google'
   import './globals.css'
   import Navbar from '@/components/layout/Navbar'
   import Footer from '@/components/layout/Footer'

   const inter = Inter({ subsets: ['latin'] })

   export const metadata = {
     title: 'Industrial Export Company',
     description: 'High-quality industrial products for global export',
   }

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="en">
         <body className={inter.className}>
           <Navbar />
           <main className="min-h-screen">{children}</main>
           <Footer />
         </body>
       </html>
     )
   }
   ```

2. **Create Layout Components**
   - Implement responsive navbar with mobile menu
   - Add footer with company information
   - Set up main content wrapper with TypeScript props

### Phase 2: Core Components (3-4 days)

1. **Navbar Component**
```typescript
// components/layout/Navbar.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/products/SearchBar'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Transparent on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {/* Navbar implementation */}
    </header>
  )
}

export default Navbar
```

2. **Search Implementation**
```typescript
// components/products/SearchBar.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { Product } from '@/lib/types'

interface SearchBarProps {
  products: Product[]
}

const SearchBar = ({ products }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const router = useRouter()

  // Fuse.js setup and search logic
  useEffect(() => {
    if (debouncedSearchTerm) {
      const fuse = new Fuse(products, {
        keys: ['name', 'category', 'description'],
        threshold: 0.4,
      })

      const results = fuse.search(debouncedSearchTerm).map(result => result.item)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchTerm, products])

  return (
    <div className="relative">
      {/* Search implementation */}
    </div>
  )
}

export default SearchBar
```

3. **Product Components**
```typescript
// components/products/ProductGrid.tsx
import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'
import { Product } from '@/lib/types'

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilter products={products} onFilter={setFilteredProducts} />
        <div className="flex-1">
          {/* View toggle and product grid implementation */}
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
```

### Phase 3: Pages Development (4-5 days)

1. **Home Page**
```typescript
// app/(site)/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/lib/utils/helpers'
import { getPartners } from '@/data/partners'
import ProductCard from '@/components/products/ProductCard'

export default async function Home() {
  const featuredProducts = await getProducts({ featured: true })
  const partners = await getPartners()

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Hero content */}
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Partner Showcase */}
      {/* Value Proposition */}
    </>
  )
}
```

2. **Products Page**
```typescript
// app/(site)/products/page.tsx
import { Suspense } from 'react'
import { getProducts } from '@/lib/utils/helpers'
import ProductGrid from '@/components/products/ProductGrid'
import SearchBar from '@/components/products/SearchBar'
import { Product } from '@/lib/types'

interface ProductsPageProps {
  searchParams: {
    category?: string
    q?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getProducts({
    category: searchParams.category,
    search: searchParams.q,
    page: searchParams.page ? parseInt(searchParams.page) : 1
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <SearchBar products={products} />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  )
}
```

3. **Contact Page**
```typescript
// app/(site)/contact/page.tsx
import ContactForm from '@/components/forms/ContactForm'
import Map from '@/components/ui/Map'

export const metadata = {
  title: 'Contact Us | Industrial Export Company',
  description: 'Get in touch with our team for inquiries about our industrial products',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ContactForm />
        </div>
        <div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
            {/* Company info */}
          </div>
          <div className="mt-8 h-80 rounded-lg overflow-hidden">
            <Map />
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Styling Guidelines

### 1. Color Scheme
```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#808080',
        accent: '#FF6F00',
        text: '#333333',
        background: '#FFFFFF',
      }
    }
  }
}
```

### 2. Typography
```css
/* tailwind.config.js */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        heading: ['var(--font-poppins)', ...fontFamily.sans],
      }
    }
  }
}
```

### 3. Responsive Breakpoints
```css
/* Using Tailwind default breakpoints */
sm: '640px'
md: '768px'
lg: '1024px'
xl: '1280px'
2xl: '1536px'
```

## Data Management

### 1. Type Definitions
```typescript
// lib/types/index.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  featured?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### 2. API Routes
```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import type { ContactFormData } from '@/lib/types'

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    // Validate form data
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      )
    }

    // Process form submission (e.g., send email, store in database)
    // ...

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
```

## Testing Guidelines

1. **Component Testing with Jest and React Testing Library**
   - Test responsive behavior
   - Verify form validation
   - Check search functionality
   - Test server components and client components separately

2. **Performance Testing**
   - Use Next.js built-in analytics
   - Implement Core Web Vitals monitoring
   - Test image optimization with next/image
   - Verify server components performance

## Deployment Checklist

1. **Pre-deployment**
   - Run TypeScript checks: `tsc --noEmit`
   - Run ESLint: `next lint`
   - Check for console errors
   - Test all forms

2. **SEO Optimization**
   - Implement metadata in each page
   - Create sitemap.xml using Next.js built-in support
   - Configure robots.txt
   - Use semantic HTML and proper alt tags

3. **Next.js Specific**
   - Configure next.config.js
   - Set up environment variables
   - Implement proper error boundaries
   - Configure image domains for next/image

## Development Timeline

1. **Week 1**: Setup & Layout
   - Next.js project initialization with TypeScript
   - App Router setup
   - Navbar & footer components

2. **Week 2**: Core Features
   - Product catalog with server components
   - Search functionality with client components
   - Contact form with server actions

3. **Week 3**: Polish & Testing
   - Responsive design
   - Performance optimization
   - TypeScript type checking
   - Bug fixes

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
- [Fuse.js Documentation](https://fusejs.io)

## Support

For any questions or issues during development:
1. Check the existing documentation
2. Review component specifications
3. Test in different environments
4. Document any bugs or unclear requirements

---

This guide will be updated as development progresses. Follow the phases in order and refer to the specific component documentation as needed.
