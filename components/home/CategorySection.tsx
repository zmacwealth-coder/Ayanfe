import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

const categoryIcons: Record<string, string> = {
  'bespoke-suits': '👔',
  kaftans: '👘',
  agbada: '🌟',
  'wedding-attires': '💍',
  monogram: '✒️',
};

const categoryColors: Record<string, string> = {
  'bespoke-suits': 'linear-gradient(135deg, #0d001a 0%, #2d0057 100%)',
  kaftans: 'linear-gradient(135deg, #1b2a4a 0%, #2166ac 100%)',
  agbada: 'linear-gradient(135deg, #3d2b00 0%, #c9a84c 100%)',
  'wedding-attires': 'linear-gradient(135deg, #6d0000 0%, #c62828 100%)',
  monogram: 'linear-gradient(135deg, #1b4332 0%, #388e3c 100%)',
};

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="text-label" style={{ color: 'var(--color-primary)' }}>Our Craft</span>
          </div>
          <h2 className="text-headline" style={{ marginBottom: '1rem' }}>
            Explore Collections
          </h2>
          <p style={{
            fontSize: 'var(--text-md)',
            color: 'var(--warm-gray)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Every garment tells a story. Discover the range of our bespoke craftsmanship.
          </p>
        </div>

        {/* Category Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem',
        }} className="category-grid">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={cat.slug === 'monogram' ? '/monogram' : `/collections/${cat.slug}`}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '3/4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                textDecoration: 'none',
                cursor: 'pointer',
                background: categoryColors[cat.slug] || 'var(--purple-800)',
                transition: 'transform var(--duration-slow) var(--ease-out), box-shadow var(--duration-slow) var(--ease-out)',
                animation: `fadeUp 0.6s ease-out ${i * 80}ms both`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xl)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Background Image */}
              {cat.imageUrl && (
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.3,
                  }}
                />
              )}

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
              }} />

              {/* Icon */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                fontSize: '1.75rem',
              }}>
                {categoryIcons[cat.slug] || '✨'}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', padding: '1.25rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.125rem)',
                  fontWeight: 500,
                  color: '#fff',
                  marginBottom: '0.375rem',
                  lineHeight: 1.2,
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as any}>
                  {cat.description}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  marginTop: '0.75rem',
                  color: 'var(--gold-light)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}>
                  Explore <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .category-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
