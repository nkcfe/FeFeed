import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.post.findMany({
      select: {
        category: true,
      },
    });
    const setCategories = new Set(
      categories.map((category) => category.category),
    );
    return NextResponse.json(Array.from(setCategories));
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
