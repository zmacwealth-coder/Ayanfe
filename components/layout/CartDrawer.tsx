'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export function CartDrawer() {
  const { items, isCartOpen, setCartOpen, removeFromCart, updateQuantity, getCartTotal } =
    useCartStore();
  const total = getCartTotal();

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} role="dialog" aria-label="Shopping Cart">
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h2 style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '1.375rem',
              fontWeight: 500,
              color: 'var(--color-text)',
            }}>
              Your Cart
            </h2>
            {items.length > 0 && (
              <span style={{
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px',
              }}>
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--cream)',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text)',
              transition: 'background 0.15s',
            }}
            aria-label="Close cart"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '1.5rem',
              paddingTop: '4rem',
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'var(--purple-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ShoppingBag size={32} color="var(--purple-300)" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  Your cart is empty
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--warm-gray)' }}>
                  Discover our bespoke collections
                </p>
              </div>
              <Link
                href="/shop"
                className="btn btn-primary btn-sm"
                onClick={() => setCartOpen(false)}
              >
                Explore Collections
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'var(--cream)',
                    borderRadius: 'var(--radius-lg)',
                    position: 'relative',
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: 80,
                    height: 96,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'var(--cream-dark)',
                  }}>
                    <img
                      src={item.image || '/images/placeholder.jpg'}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setCartOpen(false)}
                      style={{ textDecoration: 'none' }}
                    >
                      <h3 style={{
                        fontFamily: 'var(--font-editorial)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        marginBottom: '0.25rem',
                        lineHeight: 1.3,
                      }}>
                        {item.name}
                      </h3>
                    </Link>

                    {(item.selectedSize || item.selectedColor) && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', marginBottom: '0.5rem' }}>
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && ' · '}
                        {item.selectedColor && <span>{item.selectedColor}</span>}
                      </div>
                    )}

                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                      {formatPrice(item.price)}
                    </div>

                    {/* Qty + Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--warm-gray)',
                          fontSize: '0.75rem',
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-error)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)')}
                        aria-label="Remove item"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flexShrink: 0,
          }}>
            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--warm-gray)' }}>Subtotal</span>
              <span style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
              }}>
                {formatPrice(total)}
              </span>
            </div>

            {/* Note */}
            <p style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', textAlign: 'center' }}>
              Shipping & taxes calculated at checkout
            </p>

            {/* CTA */}
            <Link
              href="/cart"
              className="btn btn-primary btn-lg"
              onClick={() => setCartOpen(false)}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
            >
              <span>View Cart</span>
              <ArrowRight size={18} />
            </Link>
            <button
              className="btn btn-ghost"
              onClick={() => setCartOpen(false)}
              style={{ width: '100%' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
