import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BrandStory } from '@/components/home/BrandStory';
import { WeddingBanner } from '@/components/home/WeddingBanner';
import { MonogramTeaser } from '@/components/home/MonogramTeaser';
import { Testimonials } from '@/components/home/Testimonials';
import { db } from '@/db';
import { products, categories } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'AYANFE CLOTHIERS — We Style You, You Flaunt It',
  description:
    "Nigeria's premier bespoke fashion house. Handcrafted suits, kaftans, agbada, and wedding attires. We Style You, You Flaunt It.",
};

export default async function HomePage() {
  const [featuredProducts, allCategories] = await Promise.all([
    db.query.products.findMany({
      where: and(eq(products.isFeatured, true), eq(products.isActive, true)),
      with: { category: true },
      limit: 8,
    }),
    db.query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: (c, { asc }) => [asc(c.displayOrder)],
    }),
  ]);

  return (
    <div>
      <HeroSection />
      <CategorySection categories={allCategories} />
      <FeaturedProducts products={featuredProducts} />
      <BrandStory />
      <WeddingBanner />
      <MonogramTeaser />
      <Testimonials />
    </div>
  );
}
