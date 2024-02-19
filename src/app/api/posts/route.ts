import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(post);
  } else {
    const post = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(post);
  }
}

export async function POST(req: NextRequest) {
  const { image, title, description, content, category, selectedTags } =
    await req.json();

  const result = await prisma.post.create({
    data: {
      coverImage: image,
      title,
      description,
      content,
      category,
      tags: selectedTags,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, image, title, description, content, category, selectedTags } =
    await req.json();

  const result = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title: title,
      coverImage: image,
      description: description,
      content: content,
      category: category,
      tags: selectedTags,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const result = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(result, { status: 200 });
}
