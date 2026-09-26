'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="page-wrapper section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--purple-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={40} color="var(--purple-300)" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem' }}>Your cart is empty</h1>
          <p style={{ color: 'var(--warm-gray)' }}>Explore our bespoke collections to find your perfect piece.</p>
          <Link href="/shop" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: '3rem 0 2rem' }}>
        <div className="container">
          <Link href="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--warm-gray)', textDecoration: 'none', marginBottom: '1rem' }}>
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
            Shopping Cart
          </h1>
          <p style={{ color: 'var(--warm-gray)', marginTop: '0.5rem' }}>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'flex-start' }} className="cart-layout">

            {/* Cart Items */}
            <div>
              {items.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <div style={{ width: 100, height: 120, borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0, background: 'var(--cream)' }}>
                    <img src={item.image || '/images/placeholder.jpg'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Link href={`/products/${item.slug}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.375rem', color: 'var(--color-text)' }}>
                        {item.name}
                      </h3>
                    </Link>
                    {(item.selectedSize || item.selectedColor) && (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--warm-gray)', marginBottom: '0.75rem' }}>
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && ' · '}
                        {item.selectedColor && item.selectedColor}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{formatPrice(item.price * item.quantity)}</span>
                        <button onClick={() => removeFromCart(item.productId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-gray)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', transition: 'color 0.15s' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={clearCart} style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trash2 size={14} /> Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-2xl)', padding: '2rem', position: 'sticky', top: 'calc(var(--nav-height) + 1.5rem)' }}>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--warm-gray)' }}>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--warm-gray)' }}>Shipping</span>
                  <span style={{ color: 'var(--color-success, green)' }}>Calculated at checkout</span>
                </div>
              </div>

              <div className="divider" />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
              </div>

              <Link
                href="/contact"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Link>
              <p style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', textAlign: 'center' }}>
                Secure checkout via WhatsApp or our team will contact you to confirm your order.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
