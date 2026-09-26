import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { monogramRequests } from '@/db/schema';
import { monogramRequestSchema } from '@/lib/validations';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const parsed = monogramRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const request_data: any = {
      initials: data.initials,
      fullName: data.fullName,
      garmentType: data.garmentType,
      fabric: data.fabric,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      fontSize: data.fontSize,
      fontStyle: data.fontStyle,
      placement: data.placement,
      specialNotes: data.specialNotes,
    };

    if (session?.user?.id) {
      request_data.userId = session.user.id;
    } else {
      request_data.guestEmail = data.guestEmail;
      request_data.guestName = data.guestName;
      request_data.guestPhone = data.guestPhone;
    }

    const inserted = await db.insert(monogramRequests).values(request_data).returning();

    return NextResponse.json(
      { message: 'Monogram request submitted successfully', id: inserted[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Monogram request error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requests = await db.query.monogramRequests.findMany({
      orderBy: (m, { desc }) => [desc(m.createdAt)],
    });

    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
