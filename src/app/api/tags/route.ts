import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.post.findMany({
      select: {
        tags: true,
      },
    });
    const setTags = new Set(tags.flatMap((tag) => tag.tags));
    return NextResponse.json(Array.from(setTags));
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
