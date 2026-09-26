'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Adewale Okonkwo',
    title: 'CEO, Okonkwo Group',
    review:
      'AYANFE CLOTHIERS transformed my wardrobe. My bespoke suit from them is the finest piece of clothing I have ever owned. The attention to detail is extraordinary — every stitch deliberate, every fabric choice considered.',
    rating: 5,
    service: 'Bespoke Suit',
  },
  {
    id: 2,
    name: 'Funmilayo Adeyemi',
    title: 'Bride, Lagos 2024',
    review:
      'We chose The Royal Package for our wedding and every single guest complimented the entire wedding party. The matching agbada for my husband and his groomsmen, combined with my gown — perfection incarnate.',
    rating: 5,
    service: 'Wedding Package',
  },
  {
    id: 3,
    name: 'Emeka Nwosu',
    title: 'Senator, Anambra State',
    review:
      'I have worn bespoke from London and Milan. AYANFE stands right there with the best in the world. My Agbada for the state dinner drew more compliments than I can count. Truly world-class.',
    rating: 5,
    service: 'Imperial Agbada',
  },
  {
    id: 4,
    name: 'Tola Fashola',
    title: 'Fashion Director',
    review:
      'The monogram service is impeccable. My initials on my kaftan sleeve are embroidered with such precision and artistry — it elevates the entire piece. I now have every garment monogrammed by AYANFE.',
    rating: 5,
    service: 'Monogram Service',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="text-label" style={{ color: 'var(--color-primary)' }}>Testimonials</span>
          </div>
          <h2 className="text-headline">What Our Clients Say</h2>
        </div>

        {/* Testimonial Card */}
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
          position: 'relative',
        }}>
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)',
              textAlign: 'center',
            }}
            key={t.id}
          >
            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} fill="var(--gold)" color="var(--gold)" />
              ))}
            </div>

            {/* Quote */}
            <blockquote style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)',
              fontStyle: 'italic',
              color: 'var(--color-text)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                top: '-0.5rem',
                left: '-0.5rem',
                fontFamily: 'Georgia, serif',
                fontSize: '5rem',
                lineHeight: 1,
                color: 'var(--purple-200)',
                userSelect: 'none',
              }}>&ldquo;</span>
              {t.review}
            </blockquote>

            {/* Author */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.25rem',
                color: '#fff',
                fontWeight: 500,
                marginBottom: '0.75rem',
              }}>
                {t.name.charAt(0)}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text)' }}>
                {t.name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--warm-gray)' }}>{t.title}</div>
              <span style={{
                marginTop: '0.5rem',
                padding: '0.2rem 0.75rem',
                background: 'var(--purple-100)',
                color: 'var(--color-primary)',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}>
                {t.service}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
          }}>
            <button
              onClick={prev}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1.5px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text)',
                transition: 'all 0.2s',
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: '999px',
                    background: i === current ? 'var(--color-primary)' : 'var(--purple-200)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1.5px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text)',
                transition: 'all 0.2s',
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
