'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, ChevronRight, Check, Minus, Plus, Share2, Clock, Shield } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';
import toast from 'react-hot-toast';

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    shortDescription: string | null;
    price: string;
    comparePrice: string | null;
    images: string[];
    availableSizes: string[];
    availableColors: { name: string; hex: string }[];
    materials: string[];
    tags: string[];
    isBespoke: boolean;
    isNew: boolean;
    leadTimeDays: number | null;
    stock: number;
    category: { name: string; slug: string };
  };
  related: any[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useCartStore();

  const price = parseFloat(product.price);
  const comparePrice = product.comparePrice ? parseFloat(product.comparePrice) : null;
  const discount = comparePrice ? getDiscountPercentage(price, comparePrice) : 0;
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (product.availableSizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: price * quantity,
      image: product.images?.[0] || '',
      slug: product.slug,
      quantity,
      selectedSize,
      selectedColor,
    });
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--warm-gray)' }}>
          <Link href="/" style={{ color: 'var(--warm-gray)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} />
          <Link href={`/collections/${product.category.slug}`} style={{ color: 'var(--warm-gray)', textDecoration: 'none' }}>
            {product.category.name}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="container section-sm">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'flex-start',
        }} className="product-detail-grid">

          {/* Images */}
          <div>
            {/* Main image */}
            <div style={{
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              background: 'var(--cream)',
              marginBottom: '1rem',
              position: 'relative',
            }}>
              <img
                src={product.images?.[selectedImage] || '/images/placeholder.jpg'}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {product.isNew && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span className="badge badge-new">New Arrival</span>
                </div>
              )}
              {discount > 0 && (
                <div style={{ position: 'absolute', top: product.isNew ? '3rem' : '1rem', left: '1rem' }}>
                  <span className="badge badge-sale">-{discount}% OFF</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: 72,
                      height: 88,
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: `2px solid ${i === selectedImage ? 'var(--color-primary)' : 'transparent'}`,
                      cursor: 'pointer',
                      padding: 0,
                      flexShrink: 0,
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Category + Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <Link
                href={`/collections/${product.category.slug}`}
                style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', textDecoration: 'none' }}
              >
                {product.category.name}
              </Link>
              {product.isBespoke && <span className="badge badge-gold">Bespoke</span>}
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 400,
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}>
              {product.name}
            </h1>

            {/* Short Description */}
            {product.shortDescription && (
              <p style={{ fontSize: '1rem', color: 'var(--warm-gray)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                {formatPrice(price)}
              </span>
              {comparePrice && (
                <span style={{ fontSize: '1.125rem', color: 'var(--warm-gray)', textDecoration: 'line-through' }}>
                  {formatPrice(comparePrice)}
                </span>
              )}
              {discount > 0 && (
                <span style={{ background: '#ffebee', color: '#c62828', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem', borderRadius: '999px' }}>
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="divider" />

            {/* Size Selector */}
            {product.availableSizes?.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Size: <strong>{selectedSize}</strong></span>
                  <button style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Size Guide
                  </button>
                </div>
                <div className="size-options">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.availableColors?.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Color: <strong>{selectedColor}</strong></span>
                </div>
                <div className="color-options">
                  {product.availableColors.map((color) => (
                    <button
                      key={color.name}
                      className={`color-swatch ${selectedColor === color.name ? 'selected' : ''}`}
                      style={{ background: color.hex }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>Quantity</span>
              <div className="qty-control" style={{ display: 'inline-flex' }}>
                <button className="qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus size={14} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity((q) => q + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToCart}
                className={`btn btn-lg ${inCart ? 'btn-ghost' : 'btn-primary'}`}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {inCart ? <><Check size={18} /> In Cart</> : <><ShoppingBag size={18} /> Add to Cart</>}
              </button>
              <button
                onClick={() => addToWishlist({
                  productId: product.id,
                  name: product.name,
                  price,
                  image: product.images?.[0] || '',
                  slug: product.slug,
                  categorySlug: product.category.slug,
                })}
                className={`btn btn-icon btn-ghost ${inWishlist ? '' : ''}`}
                style={{ border: `1.5px solid ${inWishlist ? 'var(--color-primary)' : 'var(--color-border)'}`, color: inWishlist ? 'var(--color-primary)' : 'inherit' }}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <button className="btn btn-icon btn-ghost" aria-label="Share">
                <Share2 size={18} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              background: 'var(--cream)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}>
              {[
                { icon: <Clock size={14} />, text: product.leadTimeDays ? `${product.leadTimeDays}-day lead time` : 'In Stock' },
                { icon: <Shield size={14} />, text: '100% Authentic' },
                { icon: <Check size={14} />, text: 'Master Tailored' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--warm-gray)' }}>
                  <span style={{ color: 'var(--color-primary)' }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>

            <div className="divider" />

            {/* Description */}
            {product.description && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', marginBottom: '0.75rem' }}>
                  About This Piece
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--warm-gray)', lineHeight: 1.8 }}>
                  {product.description}
                </p>
              </div>
            )}

            {/* Materials */}
            {product.materials?.length > 0 && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.125rem', marginBottom: '0.75rem' }}>
                  Materials
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {product.materials.map((m) => (
                    <li key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--warm-gray)' }}>
                      <Check size={12} color="var(--gold)" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <h2 className="text-headline" style={{ marginBottom: '2rem' }}>You May Also Like</h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
