import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlistItems, products } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wishlist = await db.query.wishlistItems.findMany({
      where: eq(wishlistItems.userId, session.user.id),
      with: { product: { with: { category: true } } },
    });

    return NextResponse.json({ wishlist });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();

    const existing = await db.query.wishlistItems.findFirst({
      where: and(
        eq(wishlistItems.userId, session.user.id),
        eq(wishlistItems.productId, productId)
      ),
    });

    if (existing) {
      return NextResponse.json({ message: 'Already in wishlist' }, { status: 409 });
    }

    const item = await db
      .insert(wishlistItems)
      .values({ userId: session.user.id, productId })
      .returning();

    return NextResponse.json({ item: item[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();

    await db
      .delete(wishlistItems)
      .where(
        and(
          eq(wishlistItems.userId, session.user.id),
          eq(wishlistItems.productId, productId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
  }
}
