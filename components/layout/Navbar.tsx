'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/useCartStore';
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Search,
  LogOut,
  Settings,
  Package,
} from 'lucide-react';

const navLinks = [
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'Bespoke Suits', href: '/collections/bespoke-suits', desc: 'Tailored to perfection' },
      { label: 'Kaftans', href: '/collections/kaftans', desc: 'Elegance redefined' },
      { label: 'Agbada', href: '/collections/agbada', desc: 'Royal heritage' },
      { label: 'Wedding Attires', href: '/collections/wedding-attires', desc: 'For your special day' },
      { label: 'Monogram Service', href: '/monogram', desc: 'Your initials, artfully done' },
    ],
  },
  { label: 'Shop', href: '/shop' },
  { label: 'Wedding', href: '/wedding' },
  { label: 'Monogram', href: '/monogram' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { getCartCount, setCartOpen, wishlist } = useCartStore();
  const cartCount = getCartCount();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`navbar ${scrolled || mobileOpen ? 'navbar-glass' : 'navbar-transparent'}`}
        ref={dropdownRef}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 600,
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              letterSpacing: '0.08em',
              color: scrolled ? 'var(--color-text)' : '#fff',
              lineHeight: 1.1,
              transition: 'color 0.3s',
            }}>
              AYANFE
            </span>
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              color: scrolled ? 'var(--warm-gray)' : 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}>
              CLOTHIERS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop">
            {navLinks.map((link) => (
              <div key={link.label} style={{ position: 'relative' }}>
                {link.children ? (
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: scrolled ? 'var(--color-text)' : 'rgba(255,255,255,0.9)',
                      letterSpacing: '0.01em',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      padding: '0.5rem 0',
                    }}
                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      style={{
                        transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: scrolled ? 'var(--color-text)' : 'rgba(255,255,255,0.9)',
                      letterSpacing: '0.01em',
                      transition: 'color 0.2s',
                      padding: '0.5rem 0',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Mega Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 1rem)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--glass-white-solid)',
                    backdropFilter: 'var(--glass-blur)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-xl)',
                    padding: '1rem',
                    minWidth: '280px',
                    zIndex: 200,
                    animation: 'fadeDown 0.2s ease-out',
                  }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          textDecoration: 'none',
                          transition: 'background 0.15s',
                          gap: '2px',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--purple-50)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          color: 'var(--color-text)',
                        }}>
                          {child.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.75rem',
                          color: 'var(--warm-gray)',
                        }}>
                          {child.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? 'var(--color-text)' : '#fff',
                transition: 'background 0.2s, color 0.2s',
              }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                color: scrolled ? 'var(--color-text)' : '#fff',
                transition: 'color 0.2s',
              }}
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  color: '#fff',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? 'var(--color-text)' : '#fff',
                transition: 'color 0.2s',
              }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {session ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fff',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {session.user?.name?.charAt(0).toUpperCase()}
                </button>
                {userMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    background: 'var(--glass-white-solid)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xl)',
                    minWidth: 180,
                    overflow: 'hidden',
                    animation: 'fadeDown 0.15s ease-out',
                    zIndex: 200,
                  }}>
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{session.user?.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--warm-gray)' }}>{session.user?.email}</div>
                    </div>
                    <Link href="/account" onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.875rem', textDecoration: 'none', color: 'var(--color-text)' }}>
                      <Package size={14} /> My Orders
                    </Link>
                    {(session.user as any)?.role === 'admin' && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.875rem', textDecoration: 'none', color: 'var(--color-primary)' }}>
                        <Settings size={14} /> Admin
                      </Link>
                    )}
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.875rem', width: '100%', textAlign: 'left', color: 'var(--color-error)', borderTop: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', border: 'none', borderTop: '1px solid var(--color-border)' } as any}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '999px',
                  background: scrolled ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)',
                  border: '1.5px solid',
                  borderColor: scrolled ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)',
                  color: '#fff',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
              >
                <User size={14} />
                Sign In
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? 'var(--color-text)' : '#fff',
              }}
              className="nav-mobile-btn"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1rem var(--container-pad)',
            animation: 'fadeDown 0.2s ease-out',
          }}>
            <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', gap: '0.75rem' }}>
              <Search size={18} style={{ color: 'var(--warm-gray)', flexShrink: 0, marginTop: '0.6rem' }} />
              <input
                autoFocus
                placeholder="Search bespoke suits, kaftans, agbada..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  background: 'transparent',
                  padding: '0.5rem 0',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false);
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value;
                    if (val) {
                      window.location.href = `/shop?search=${encodeURIComponent(val)}`;
                    }
                  }
                }}
              />
              <button onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-gray)' }}>
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(26, 0, 51, 0.97)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 'calc(var(--nav-height) + 1rem)',
          animation: 'fadeIn 0.25s ease-out',
        }}>
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link, i) => (
              <div key={link.label}>
                <Link
                  href={link.href || '#'}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-editorial)',
                    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    letterSpacing: '-0.01em',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    animation: `fadeUp 0.4s ease-out ${i * 50}ms both`,
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div style={{ paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.875rem',
                          color: 'rgba(255,255,255,0.6)',
                          textDecoration: 'none',
                          padding: '0.25rem 0',
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', padding: '2rem', display: 'flex', gap: '1rem' }}>
            {session ? (
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="btn btn-ghost"
                style={{ flex: 1, color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn btn-secondary" style={{ flex: 1, color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
                  Sign In
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
