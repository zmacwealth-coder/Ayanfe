import type { Metadata } from 'next';
import { db } from '@/db';
import { products, categories } from '@/db/schema';
import { eq, and, ilike, or, asc, desc } from 'drizzle-orm';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopFilters } from '@/components/shop/ShopFilters';

export const metadata: Metadata = {
  title: 'Shop All Collections',
  description: 'Browse all bespoke suits, kaftans, agbada, wedding attires, and monogram services from AYANFE CLOTHIERS.',
};

interface ShopPageProps {
  searchParams: Promise<{ search?: string; sort?: string; category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { search, sort, category: categorySlug } = params;

  const conditions = [eq(products.isActive, true)];

  if (categorySlug) {
    const cat = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    if (cat) conditions.push(eq(products.categoryId, cat.id));
  }

  if (search) {
    conditions.push(
      or(
        ilike(products.name, `%${search}%`),
        ilike(products.description, `%${search}%`)
      )!
    );
  }

  const [allProducts, allCategories] = await Promise.all([
    db.query.products.findMany({
      where: and(...conditions),
      with: { category: true },
      orderBy:
        sort === 'price_asc'
          ? asc(products.price)
          : sort === 'price_desc'
          ? desc(products.price)
          : sort === 'name'
          ? asc(products.name)
          : desc(products.createdAt),
    }),
    db.query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: asc(categories.displayOrder),
    }),
  ]);

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%)',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--gold)', marginBottom: '0.75rem', display: 'block' }}>
            Our Collections
          </span>
          <h1 style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            {search ? `Search: "${search}"` : categorySlug ? allCategories.find((c) => c.slug === categorySlug)?.name || 'Collection' : 'All Pieces'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            {allProducts.length} {allProducts.length === 1 ? 'piece' : 'pieces'} available
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>

            {/* Filters Sidebar */}
            <ShopFilters
              categories={allCategories}
              currentCategory={categorySlug}
              currentSort={sort}
              currentSearch={search}
            />

            {/* Products */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {allProducts.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-2xl)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    No results found
                  </h3>
                  <p style={{ color: 'var(--warm-gray)' }}>
                    Try adjusting your search or browse all collections
                  </p>
                  <a href="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                    View All
                  </a>
                </div>
              ) : (
                <div className="product-grid">
                  {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product as any} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
