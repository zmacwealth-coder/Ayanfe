'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-section" style={{ minHeight: '100svh' }}>
      {/* Background */}
      <div className="hero-bg" />

      {/* Animated gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 'clamp(300px, 40vw, 600px)',
        height: 'clamp(300px, 40vw, 600px)',
        background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: 'clamp(200px, 30vw, 400px)',
        height: 'clamp(200px, 30vw, 400px)',
        background: 'radial-gradient(circle, rgba(186,104,200,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 6s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '100svh',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
        paddingBottom: '4rem',
      }}>
        {/* Pre-label */}
        <div className="section-label animate-fade-up" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="text-label" style={{ color: 'var(--gold-light)', letterSpacing: '0.2em' }}>
            Bespoke Since Excellence
          </span>
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-hero animate-fade-up delay-1"
          style={{
            color: '#fff',
            maxWidth: '700px',
            marginBottom: 'var(--space-6)',
          }}
        >
          Draped in
          <br />
          <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Mastery.</em>
          <br />
          Dressed to
          <br />
          <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Conquer.</em>
        </h1>

        {/* Tagline */}
        <p
          className="animate-fade-up delay-2"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: 'var(--space-10)',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}
        >
          We Style You, You Flaunt It...
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/collections" className="btn btn-gold btn-lg">
            Explore Collections
            <ArrowRight size={18} />
          </Link>
          <Link href="/monogram" className="btn btn-lg" style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            color: '#fff',
          }}>
            Monogram Service
          </Link>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-up delay-4"
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '5,000+', label: 'Happy Clients' },
            { value: '15+', label: 'Years of Excellence' },
            { value: '100%', label: 'Bespoke Crafted' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 600,
                color: '#fff',
                lineHeight: 1.1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.5)',
                marginTop: '0.25rem',
                letterSpacing: '0.05em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'rgba(255,255,255,0.4)',
        animation: 'float 2s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
