export function BrandStory() {
  return (
    <section className="section" style={{ background: 'var(--purple-950)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }} className="brand-grid">

          {/* Text */}
          <div>
            <div className="section-label" style={{ marginBottom: '2rem' }}>
              <span className="text-label" style={{ color: 'var(--gold)' }}>Our Story</span>
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
              Crafted with
              <br />
              <em style={{ color: 'var(--gold-light)' }}>intention,</em>
              <br />
              worn with
              <br />
              <em style={{ color: 'var(--gold-light)' }}>pride.</em>
            </h2>

            <p style={{
              fontSize: 'var(--text-md)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}>
              At AYANFE CLOTHIERS, we believe every garment should be a masterpiece —
              a perfect union of tradition and modernity, of heritage and aspiration.
              Our master tailors bring decades of experience to every stitch.
            </p>

            <p style={{
              fontSize: 'var(--text-md)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}>
              From the first consultation to the final fitting, we ensure that every
              garment tells your unique story — because when you look extraordinary,
              you feel extraordinary.
            </p>

            <div style={{ display: 'flex', gap: '3rem', marginBottom: '2.5rem' }}>
              {[
                { value: '15+', label: 'Years' },
                { value: '50+', label: 'Master Tailors' },
                { value: '5K+', label: 'Clients' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--gold-light)',
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.25rem' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a href="/about" className="btn btn-gold">
              Our Story
            </a>
          </div>

          {/* Visual */}
          <div style={{ position: 'relative' }}>
            {/* Main image block */}
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, var(--purple-800) 0%, var(--purple-600) 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative pattern */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(201,168,76,0.05) 20px,
                  rgba(201,168,76,0.05) 21px
                )`,
              }} />

              {/* Center emblem */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  border: '2px solid var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulseGlow 3s ease-in-out infinite',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '2.5rem',
                    color: 'var(--gold)',
                    fontWeight: 600,
                  }}>A</span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.1em',
                }}>
                  Est. 2009
                </p>
              </div>

              {/* Gold accents */}
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '-20px',
                width: 40,
                height: '60%',
                background: 'var(--gold)',
                borderRadius: '4px',
                opacity: 0.3,
              }} />
              <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '-20px',
                width: 40,
                height: '40%',
                background: 'var(--gold)',
                borderRadius: '4px',
                opacity: 0.2,
              }} />
            </div>

            {/* Floating card */}
            <div style={{
              position: 'absolute',
              bottom: '-1.5rem',
              left: '-1.5rem',
              background: 'var(--glass-white)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem 1.5rem',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', marginBottom: '0.25rem' }}>Latest Creation</div>
              <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', fontWeight: 500, color: 'var(--color-text)' }}>
                The Royal Onyx Suit
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', fontWeight: 600, marginTop: '0.25rem' }}>
                ₦285,000
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .brand-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
