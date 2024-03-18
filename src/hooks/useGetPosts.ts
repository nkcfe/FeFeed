import { PostType } from '@/module/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { cache } from 'react';

const fetchPosts = cache(
  async (pageParam: number, selectedCategory: string, selectedTag: string) => {
    const response = await axios.get(`/api/posts?page=${pageParam}`, {
      params: {
        page: pageParam,
        limit: 12,
        category: selectedCategory,
        tag: selectedTag,
      },
    });
    return response.data;
  },
);

export const useGetPosts = (
  selectedCategory: string,
  selectedTag: string,
  initialPosts: { data: PostType[]; page: number } | null,
) =>
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) =>
      fetchPosts(pageParam, selectedCategory, selectedTag),
    initialData: !!initialPosts
      ? { pages: [initialPosts], pageParams: [1] }
      : undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });
