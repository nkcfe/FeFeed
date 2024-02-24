import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const years = await prisma.post.findMany({
      select: {
        createdAt: true,
      },
    });
    const yearSet = new Set(years.map((year) => year.createdAt.getFullYear()));

    return NextResponse.json(Array.from(yearSet));
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
