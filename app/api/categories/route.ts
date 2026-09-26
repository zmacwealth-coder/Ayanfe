import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET() {
  try {
    const allCategories = await db.query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: asc(categories.displayOrder),
    });
    return NextResponse.json({ categories: allCategories });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
