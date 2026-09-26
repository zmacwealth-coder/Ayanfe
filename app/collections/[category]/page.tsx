import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { products, categories } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { ProductCard } from '@/components/shop/ProductCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await db.query.categories.findFirst({ where: eq(categories.slug, category) });
  if (!cat) return { title: 'Collection Not Found' };
  return {
    title: cat.name,
    description: cat.description || `Browse our ${cat.name} collection at AYANFE CLOTHIERS.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;

  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });

  if (!category) notFound();

  const categoryProducts = await db.query.products.findMany({
    where: and(eq(products.categoryId, category.id), eq(products.isActive, true)),
    with: { category: true },
    orderBy: (p, { desc }) => [desc(p.isFeatured), desc(p.createdAt)],
  });

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%)',
        padding: 'clamp(3.5rem, 7vw, 6rem) 0',
      }}>
        <div className="container">
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/collections" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Collections</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#fff' }}>{category.name}</span>
          </nav>

          <span className="text-label" style={{ color: 'var(--gold)', marginBottom: '0.75rem', display: 'block' }}>
            Collection
          </span>
          <h1 style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            {category.name}
          </h1>
          {category.description && (
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', maxWidth: '600px', lineHeight: 1.7 }}>
              {category.description}
            </p>
          )}
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginTop: '1rem' }}>
            {categoryProducts.length} {categoryProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </div>

      {/* Products */}
      <section className="section">
        <div className="container">
          {categoryProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem' }}>
                Coming Soon
              </h3>
              <p style={{ color: 'var(--warm-gray)', marginTop: '0.5rem' }}>
                We&apos;re curating new pieces for this collection.
              </p>
              <Link href="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Explore All
              </Link>
            </div>
          ) : (
            <div className="product-grid">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
