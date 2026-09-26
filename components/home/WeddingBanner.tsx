import Link from 'next/link';
import { ArrowRight, Diamond, Heart, Star, Crown } from 'lucide-react';

export function WeddingBanner() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #6d0000 0%, #dc143c 50%, #b71c1c 100%)',
      padding: 'clamp(4rem, 8vw, 7rem) 0',
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }} className="wedding-grid">

          {/* Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Diamond size={16} color="var(--gold-light)" />
              <span className="text-label" style={{ color: 'var(--gold-light)', letterSpacing: '0.2em' }}>
                Wedding Collections
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}>
              Your Perfect Day
              <br />
              <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Deserves</em>
              <br />
              Perfect Attire.
            </h2>

            <p style={{
              fontSize: 'var(--text-md)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: '400px',
            }}>
              From intimate ceremonies to grand royal celebrations — our complete
              wedding packages dress the entire wedding party in curated elegance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/wedding" className="btn btn-gold btn-lg">
                View Wedding Packages
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn btn-lg" style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff',
                backdropFilter: 'blur(12px)',
              }}>
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Package Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'The Intimate Package', price: '₦450,000', icon: <Heart size={16} />, color: 'rgba(255,255,255,0.08)' },
              { name: 'The Grand Package', price: '₦850,000', icon: <Star size={16} />, color: 'rgba(201,168,76,0.15)', popular: true },
              { name: 'The Royal Package', price: '₦1,500,000', icon: <Crown size={16} />, color: 'rgba(255,255,255,0.08)' },
            ].map((pkg) => (
              <div
                key={pkg.name}
                style={{
                  background: pkg.color,
                  backdropFilter: 'blur(12px)',
                  border: `1.5px solid ${pkg.popular ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: pkg.popular ? 'var(--gold-light)' : 'rgba(255,255,255,0.6)' }}>
                    {pkg.icon}
                  </span>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: '1rem',
                      color: '#fff',
                      fontWeight: 500,
                    }}>
                      {pkg.name}
                    </div>
                    {pkg.popular && (
                      <span style={{
                        fontSize: '0.65rem',
                        color: 'var(--gold-light)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}>
                        Most Popular
                      </span>
                    )}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  color: pkg.popular ? 'var(--gold-light)' : '#fff',
                  fontSize: '1rem',
                }}>
                  {pkg.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .wedding-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
