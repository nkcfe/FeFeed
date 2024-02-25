import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(req: NextRequest) {
  try {
    const dates = await prisma.post.findMany({
      select: {
        createdAt: true,
      },
    });
    const setDates = new Set(dates.map((date) => date.createdAt));
    return NextResponse.json(Array.from(setDates));
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
