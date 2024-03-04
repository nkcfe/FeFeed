import { cache } from 'react';
import prisma from '@/libs/prismadb';

export const getPost = cache(async (id: string) => {
  const data = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!data) return null;
  return data;
});

export const getPosts = cache(
  async ({
    pageParam = 1,
    selectedCategory,
  }: {
    pageParam?: number;
    selectedCategory?: string;
  }) => {
    const posts = await prisma.post.findMany({
      take: 12,
      skip: (pageParam - 1) * 12,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        category:
          selectedCategory && selectedCategory === '전체'
            ? {}
            : { contains: selectedCategory },
      },
    });

    if (!posts) return null;
    return { data: posts, page: pageParam };
  },
);

export const getCategories = cache(async () => {
  const categories = await prisma.post.findMany({
    select: {
      category: true,
    },
  });
  const setCategories = new Set(
    categories.map((category) => category.category),
  );

  if (!categories) return null;
  return Array.from(setCategories) as string[];
});

export const getTags = cache(async () => {
  const tags = await prisma.post.findMany({
    select: {
      tags: true,
    },
  });

  const setTags = new Set(tags.flatMap((tag) => tag.tags));

  if (!tags) return null;
  return Array.from(setTags) as string[];
});
