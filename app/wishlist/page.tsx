'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Heart, X, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCartStore();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: '3rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <Heart size={24} color="var(--color-primary)" />
            <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
              Wishlist
            </h1>
          </div>
          <p style={{ color: 'var(--warm-gray)' }}>{wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--purple-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={32} color="var(--purple-300)" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem' }}>Your wishlist is empty</h2>
              <p style={{ color: 'var(--warm-gray)' }}>Save items you love to come back to them later.</p>
              <Link href="/shop" className="btn btn-primary btn-lg">Explore Collections</Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}>
              {wishlist.map((item) => (
                <div key={item.id} style={{
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.3s var(--ease-out)',
                }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', background: 'var(--cream)' }}>
                    <img
                      src={item.image || '/images/placeholder.jpg'}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(8px)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--warm-gray)',
                        transition: 'all 0.15s',
                      }}
                      aria-label="Remove from wishlist"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <Link href={`/products/${item.slug}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', fontWeight: 500, color: 'var(--color-text)', marginBottom: '0.375rem' }}>
                        {item.name}
                      </h3>
                    </Link>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                      {formatPrice(item.price)}
                    </div>
                    <button
                      onClick={() => addToCart({
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        slug: item.slug,
                        quantity: 1,
                      })}
                      className="btn btn-primary"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
