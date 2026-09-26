import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/db';
import { weddingPackages } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { Check, Diamond, ArrowRight, Phone, Calendar } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Wedding Attire Packages',
  description: 'Complete wedding attire packages for the entire wedding party. Bespoke suits, gowns, agbada, and bridesmaid coordination from AYANFE CLOTHIERS.',
};

export default async function WeddingPage() {
  const packages = await db.query.weddingPackages.findMany({
    where: eq(weddingPackages.isActive, true),
    orderBy: asc(weddingPackages.displayOrder),
  });

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #4a0000 0%, #8b0000 50%, #6d0000 100%)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(201,168,76,0.1) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Diamond size={16} color="var(--gold)" />
            <span className="text-label" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>Wedding Collections</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Your Perfect Day
            <br />
            <em style={{ color: 'var(--gold-light)' }}>Starts Here.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.0625rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            From intimate ceremonies to grand royal celebrations — we dress the entire wedding party in curated elegance, ensuring every piece tells a unified story.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#packages" className="btn btn-gold btn-lg">View Packages</a>
            <Link href="/contact" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff', backdropFilter: 'blur(12px)' }}>
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Why Us */}
      <section className="section-sm" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '👗', title: 'Complete Coordination', desc: 'We dress the bride, groom, and entire wedding party in harmonious elegance' },
              { icon: '✂️', title: 'Bespoke Craftsmanship', desc: 'Every garment is tailored to perfection for your exact measurements' },
              { icon: '💎', title: 'Premium Fabrics', desc: 'From Italian silk to authentic aso-oke, only the finest materials' },
              { icon: '📅', title: 'Dedicated Timeline', desc: 'We plan and deliver well ahead of your big day — no last-minute stress' },
            ].map((f) => (
              <div key={f.title} style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--warm-gray)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <span className="text-label" style={{ color: 'var(--color-primary)' }}>Our Packages</span>
            </div>
            <h2 className="text-headline">Wedding Attire Packages</h2>
            <p style={{ color: 'var(--warm-gray)', marginTop: '0.75rem' }}>Choose the package that matches your celebration.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  background: '#fff',
                  border: `2px solid ${pkg.isPopular ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-2xl)',
                  padding: '2.5rem 2rem',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                {pkg.isPopular && (
                  <div style={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '0.375rem 1.25rem',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                  }}>
                    Most Popular
                  </div>
                )}

                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                  {pkg.name}
                </h3>
                <p style={{ color: 'var(--warm-gray)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {pkg.description}
                </p>

                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '2.5rem', fontWeight: 600, color: pkg.isPopular ? 'var(--color-primary)' : 'var(--color-text)' }}>
                    {formatPrice(parseFloat(pkg.price as string))}
                  </span>
                  {pkg.comparePrice && (
                    <span style={{ fontSize: '1rem', color: 'var(--warm-gray)', textDecoration: 'line-through', marginLeft: '0.75rem' }}>
                      {formatPrice(parseFloat(pkg.comparePrice as string))}
                    </span>
                  )}
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {(pkg.includes as string[]).map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem' }}>
                      <Check size={14} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: 'var(--color-text)', lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                >
                  Book This Package <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: 'var(--purple-950)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#fff', marginBottom: '1rem' }}>
            Have a Custom Request?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Not sure which package fits? Our wedding stylists will work with you to create a completely custom plan for your ceremony.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-gold btn-lg">
              <Calendar size={18} /> Schedule Consultation
            </Link>
            <a href="tel:+2348012345678" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff' }}>
              <Phone size={18} /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
