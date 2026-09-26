import Link from 'next/link';
import { ArrowRight, Pen } from 'lucide-react';

const fontStyles = ['Classic', 'Modern', 'Script', 'Block'];
const placements = ['Chest', 'Cuff', 'Collar', 'Back'];

export function MonogramTeaser() {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'clamp(2.5rem, 6vw, 5rem)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }} className="monogram-grid">

          {/* Decorative */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />

          {/* Text side */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Pen size={16} color="var(--gold)" />
              <span className="text-label" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>
                Monogram Service
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: '1.25rem',
            }}>
              Your Initials,
              <br />
              <em style={{ color: 'var(--gold-light)' }}>Artfully</em> Placed.
            </h2>

            <p style={{
              fontSize: 'var(--text-base)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Personalize any garment with your monogram — 12 font styles, 
              5 placement options, and a full palette of metallic threads. 
              Starting from ₦15,000.
            </p>

            {/* Options display */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Font Styles
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {fontStyles.map((s) => (
                    <span key={s} style={{
                      padding: '0.25rem 0.625rem',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.7)',
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Placements
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {placements.map((p) => (
                    <span key={p} style={{
                      padding: '0.25rem 0.625rem',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.7)',
                    }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/monogram" className="btn btn-gold">
              Start Your Monogram
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Monogram preview */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: 'clamp(200px, 25vw, 280px)',
              height: 'clamp(200px, 25vw, 280px)',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              animation: 'float 5s ease-in-out infinite',
            }}>
              {/* Outer ring */}
              <div style={{
                position: 'absolute',
                inset: -12,
                borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.15)',
              }} />
              {/* Inner content */}
              <div style={{
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>
                  A.O
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                }}>
                  Script Style
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .monogram-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
