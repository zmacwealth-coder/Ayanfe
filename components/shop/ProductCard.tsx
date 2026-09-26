'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string | number;
  comparePrice?: string | number | null;
  images: string[];
  isNew?: boolean;
  isBespoke?: boolean;
  isFeatured?: boolean;
  category?: { name: string; slug: string };
  availableSizes?: string[];
  shortDescription?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useCartStore();
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  const comparePrice = product.comparePrice
    ? typeof product.comparePrice === 'string'
      ? parseFloat(product.comparePrice)
      : product.comparePrice
    : null;
  const discount = comparePrice ? getDiscountPercentage(price, comparePrice) : 0;
  const image = product.images?.[0] || '/images/placeholder.jpg';

  return (
    <article className="product-card">
      {/* Image */}
      <div className="product-card-image">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <img src={image} alt={product.name} loading="lazy" />
        </Link>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {product.isNew && <span className="badge badge-new">New</span>}
          {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
          {product.isBespoke && <span className="badge badge-gold">Bespoke</span>}
        </div>

        {/* Action Buttons */}
        <div className="product-card-actions">
          <button
            className={`product-action-btn ${inWishlist ? 'active' : ''}`}
            onClick={() =>
              addToWishlist({
                productId: product.id,
                name: product.name,
                price,
                image,
                slug: product.slug,
                categorySlug: product.category?.slug || '',
              })
            }
            title={inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            aria-label="Add to wishlist"
          >
            <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>

          <button
            className={`product-action-btn ${inCart ? 'active' : ''}`}
            onClick={() =>
              addToCart({
                productId: product.id,
                name: product.name,
                price,
                image,
                slug: product.slug,
                quantity: 1,
                selectedSize: product.availableSizes?.[0],
              })
            }
            title={inCart ? 'In Cart' : 'Add to Cart'}
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>

          <Link
            href={`/products/${product.slug}`}
            className="product-action-btn"
            title="Quick View"
            aria-label="View product"
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="product-card-body">
        {product.category && (
          <Link
            href={`/collections/${product.category.slug}`}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              marginBottom: '0.375rem',
              display: 'block',
            }}
          >
            {product.category.name}
          </Link>
        )}

        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '1.125rem',
            fontWeight: 500,
            color: 'var(--color-text)',
            marginBottom: '0.375rem',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>
            {product.name}
          </h3>
        </Link>

        {product.shortDescription && (
          <p style={{
            fontSize: '0.8125rem',
            color: 'var(--warm-gray)',
            lineHeight: 1.5,
            marginBottom: '0.75rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as any}>
            {product.shortDescription}
          </p>
        )}

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="price" style={{ fontSize: '1rem' }}>{formatPrice(price)}</span>
          {comparePrice && (
            <span className="price-compare" style={{ fontSize: '0.875rem' }}>
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
