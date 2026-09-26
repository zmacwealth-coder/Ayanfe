import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Collections: [
    { label: 'Bespoke Suits', href: '/collections/bespoke-suits' },
    { label: 'Kaftans', href: '/collections/kaftans' },
    { label: 'Agbada', href: '/collections/agbada' },
    { label: 'Wedding Attires', href: '/collections/wedding-attires' },
    { label: 'Monogram Service', href: '/monogram' },
  ],
  Services: [
    { label: 'Book Consultation', href: '/contact' },
    { label: 'Wedding Packages', href: '/wedding' },
    { label: 'Custom Fitting', href: '/about#fittings' },
    { label: 'Asoebi Coordination', href: '/wedding#asoebi' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shop All', href: '/shop' },
    { label: 'My Account', href: '/account' },
  ],
};

export function Footer() {
  return (
    <footer style={{
      background: 'var(--purple-950)',
      color: 'rgba(255,255,255,0.85)',
      paddingTop: '4rem',
    }}>
      <div className="container">
        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}>
                AYANFE
              </h3>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
              }}>
                CLOTHIERS
              </p>
            </div>
            <p style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '1.125rem',
              fontStyle: 'italic',
              color: 'var(--gold-light)',
              marginBottom: '1.5rem',
              lineHeight: 1.5,
            }}>
              We Style You, You Flaunt It...
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: '240px' }}>
              Nigeria&apos;s premier bespoke fashion house, crafting garments that tell your story.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                { icon: <Instagram size={16} />, href: '#', label: 'Instagram' },
                { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
                { icon: <Facebook size={16} />, href: '#', label: 'Facebook' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-primary)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)';
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '1.25rem',
              }}>
                {group}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.65)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--gold-light)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1.25rem',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: <MapPin size={14} />, text: 'Lagos, Nigeria' },
                { icon: <Phone size={14} />, text: '+234 801 234 5678' },
                { icon: <Mail size={14} />, text: 'hello@ayanfeclothiers.com' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
                Join our style circle
              </p>
              <div style={{ display: 'flex', gap: '0' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    padding: '0.625rem 1rem',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRight: 'none',
                    borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                    color: '#fff',
                    fontSize: '0.8125rem',
                    outline: 'none',
                    fontFamily: 'var(--font-ui)',
                  }}
                />
                <button
                  style={{
                    padding: '0.625rem 1rem',
                    background: 'var(--color-primary)',
                    border: 'none',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    color: '#fff',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} AYANFE CLOTHIERS. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Returns'].map((text) => (
              <Link
                key={text}
                href="#"
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
