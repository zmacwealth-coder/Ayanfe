import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products, categories } from '@/db/schema';
import { eq, like, and, desc, asc, or, ilike } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort') || 'createdAt';

    const conditions = [eq(products.isActive, true)];

    if (category) {
      const cat = await db.query.categories.findFirst({
        where: eq(categories.slug, category),
      });
      if (cat) conditions.push(eq(products.categoryId, cat.id));
    }

    if (featured === 'true') {
      conditions.push(eq(products.isFeatured, true));
    }

    if (search) {
      conditions.push(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.description, `%${search}%`)
        )!
      );
    }

    const result = await db.query.products.findMany({
      where: and(...conditions),
      with: { category: true },
      limit,
      offset,
      orderBy: sort === 'price_asc'
        ? asc(products.price)
        : sort === 'price_desc'
        ? desc(products.price)
        : desc(products.createdAt),
    });

    return NextResponse.json({ products: result });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
