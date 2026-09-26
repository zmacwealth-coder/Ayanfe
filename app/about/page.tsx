import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About AYANFE CLOTHIERS',
  description: "The story of AYANFE CLOTHIERS — Nigeria's premier bespoke fashion house.",
};

const values = [
  { icon: '✦', title: 'Mastery', desc: 'Every stitch is placed with intention by master tailors with decades of experience.' },
  { icon: '◆', title: 'Authenticity', desc: 'We celebrate African heritage while embracing global excellence in craftsmanship.' },
  { icon: '●', title: 'Precision', desc: 'Measurements, cuts, and finishes are executed to exacting standards — nothing less.' },
  { icon: '★', title: 'Elegance', desc: 'We believe elegance is the most enduring form of beauty. Every garment embodies it.' },
];

const team = [
  { name: 'Ayodeji Ayanfe', role: 'Founder & Creative Director', initial: 'A' },
  { name: 'Nkechi Okafor', role: 'Head of Bridal', initial: 'N' },
  { name: 'Taiwo Adewale', role: 'Master Tailor', initial: 'T' },
  { name: 'Emeka Obi', role: 'Agbada & Kaftan Specialist', initial: 'E' },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--purple-950) 0%, var(--purple-800) 100%)',
        padding: 'clamp(5rem, 10vw, 9rem) 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="text-label" style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'block', letterSpacing: '0.2em' }}>
            Est. 2009
          </span>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 300, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            Crafted in Nigeria.
            <br />
            <em style={{ color: 'var(--gold-light)' }}>Worn Worldwide.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto' }}>
            We Style You, You Flaunt It...
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
            <div>
              <div className="section-label"><span className="text-label" style={{ color: 'var(--color-primary)' }}>Our Origin</span></div>
              <h2 className="text-headline" style={{ marginBottom: '1.5rem' }}>
                Born from a passion for exceptional style
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  "AYANFE CLOTHIERS was founded in 2009 in Lagos, Nigeria, by Ayodeji Ayanfe — a visionary designer who believed that West Africa deserved a fashion house that honored its rich textile heritage while achieving global standards of bespoke craftsmanship.",
                  "Starting with a small atelier in Victoria Island, the brand quickly gained a reputation for transforming even the most challenging fabric into works of art. Word spread, and clientele grew from local socialites to government officials, celebrities, and dignitaries across the continent.",
                  "Today, AYANFE CLOTHIERS operates from a state-of-the-art studio in Lagos, employing over 50 master tailors and craftsmen, each specialized in different disciplines — from bespoke suiting to intricate agbada embroidery to delicate monogram artistry.",
                ].map((p, i) => (
                  <p key={i} style={{ color: 'var(--warm-gray)', fontSize: 'var(--text-md)', lineHeight: 1.8 }}>{p}</p>
                ))}
              </div>
            </div>

            {/* Visual Block */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--purple-800) 0%, var(--purple-600) 100%)',
                borderRadius: 'var(--radius-2xl)',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                minHeight: 400,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(201,168,76,0.04) 25px, rgba(201,168,76,0.04) 26px)' }} />
                <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '6rem', color: 'rgba(201,168,76,0.2)', position: 'absolute', top: '1rem', left: '1.5rem', lineHeight: 1 }}>"</div>
                <blockquote style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', fontStyle: 'italic', color: '#fff', textAlign: 'center', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                  Dress well. The world is your runway.
                </blockquote>
                <cite style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
                  — Ayodeji Ayanfe, Founder
                </cite>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                {[
                  { value: '15+', label: 'Years of Excellence' },
                  { value: '5,000+', label: 'Happy Clients' },
                  { value: '50+', label: 'Master Craftsmen' },
                  { value: '100%', label: 'Bespoke Made' },
                ].map((s) => (
                  <div key={s.label} style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-primary)' }}>{s.value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', marginTop: '0.25rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span className="text-label" style={{ color: 'var(--color-primary)' }}>Our Principles</span></div>
            <h2 className="text-headline">What We Stand For</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '2rem' }}>
            {values.map((v) => (
              <div key={v.title} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
                <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'var(--warm-gray)', fontSize: '0.9rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span className="text-label" style={{ color: 'var(--color-primary)' }}>Our People</span></div>
            <h2 className="text-headline">Meet the Team</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {team.map((member) => (
              <div key={member.name} style={{ textAlign: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple-700), var(--purple-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontFamily: 'var(--font-editorial)', fontSize: '2.5rem', color: '#fff', fontWeight: 500 }}>
                  {member.initial}
                </div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--warm-gray)' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: 'var(--color-primary)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 500 }}>
          <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#fff', marginBottom: '1rem' }}>
            Ready to experience AYANFE?
          </h2>
          <Link href="/shop" className="btn btn-white btn-lg" style={{ display: 'inline-flex', gap: '0.5rem' }}>
            Shop Collections <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
