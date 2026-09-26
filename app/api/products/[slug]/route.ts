import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products, categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Fetch related products from same category
    const related = await db.query.products.findMany({
      where: eq(products.categoryId, product.categoryId),
      with: { category: true },
      limit: 4,
    });

    return NextResponse.json({
      product,
      related: related.filter((r) => r.id !== product.id).slice(0, 3),
    });
  } catch (error) {
    console.error('Product detail API error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
