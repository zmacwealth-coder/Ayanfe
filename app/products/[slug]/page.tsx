import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ProductDetailClient } from '@/components/shop/ProductDetailClient';
import { ProductCard } from '@/components/shop/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: { category: true },
  });
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.shortDescription || product.description || `Shop ${product.name} from AYANFE CLOTHIERS`,
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: { category: true },
  });

  if (!product || !product.isActive) notFound();

  // Related products
  const related = await db.query.products.findMany({
    where: eq(products.categoryId, product.categoryId),
    with: { category: true },
    limit: 4,
  });
  const relatedFiltered = related.filter((r) => r.id !== product.id).slice(0, 3);

  return (
    <div className="page-wrapper">
      <ProductDetailClient product={product as any} related={relatedFiltered as any} />
    </div>
  );
}
