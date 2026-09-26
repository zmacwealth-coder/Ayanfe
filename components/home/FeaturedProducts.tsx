import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  comparePrice?: string | null;
  images: string[];
  isNew?: boolean;
  isBespoke?: boolean;
  isFeatured?: boolean;
  category?: { name: string; slug: string };
  availableSizes?: string[];
  shortDescription?: string | null;
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label">
              <span className="text-label" style={{ color: 'var(--color-primary)' }}>Handpicked</span>
            </div>
            <h2 className="text-headline">Featured Pieces</h2>
          </div>
          <Link
            href="/shop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-primary)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '0.75rem'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '0.5rem'; }}
          >
            View All Pieces
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </div>
    </section>
  );
}
