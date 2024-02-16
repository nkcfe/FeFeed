import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(req: NextRequest) {
  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(post);
}
