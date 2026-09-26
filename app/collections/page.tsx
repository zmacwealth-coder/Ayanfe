import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Collections',
  description: 'Browse all AYANFE CLOTHIERS collections — Bespoke Suits, Kaftans, Agbada, Wedding Attires, and Monogram Service.',
};

const categoryBgs: Record<string, string> = {
  'bespoke-suits': 'linear-gradient(135deg, #0d001a 0%, #2d0057 100%)',
  kaftans: 'linear-gradient(135deg, #1b2a4a 0%, #2166ac 100%)',
  agbada: 'linear-gradient(135deg, #3d2b00 0%, #c9a84c 100%)',
  'wedding-attires': 'linear-gradient(135deg, #6d0000 0%, #c62828 100%)',
  monogram: 'linear-gradient(135deg, #1b4332 0%, #388e3c 100%)',
};

export default async function CollectionsPage() {
  const allCategories = await db.query.categories.findMany({
    where: eq(categories.isActive, true),
    orderBy: asc(categories.displayOrder),
  });

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%)', padding: 'clamp(4rem, 7vw, 6rem) 0', textAlign: 'center' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--gold)', marginBottom: '0.75rem', display: 'block' }}>Our Craft</span>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            All Collections
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Every collection is a celebration of craftsmanship — from the precision of bespoke suiting to the grandeur of ceremonial agbada.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {allCategories.map((cat, i) => (
              <Link
                key={cat.id}
                href={cat.slug === 'monogram' ? '/monogram' : `/collections/${cat.slug}`}
                style={{
                  borderRadius: 'var(--radius-2xl)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  minHeight: 380,
                  textDecoration: 'none',
                  background: categoryBgs[cat.slug] || 'var(--purple-800)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  animation: `fadeUp 0.5s ease-out ${i * 80}ms both`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />

                {/* Content */}
                <div style={{ position: 'relative', padding: '2rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', fontWeight: 400, color: '#fff', marginBottom: '0.5rem' }}>
                    {cat.name}
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: 300 }}>
                    {cat.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-light)', fontSize: '0.875rem', fontWeight: 500 }}>
                    Explore Collection <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
