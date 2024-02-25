'use client';

import Header from './Header';
import PostCard from '@/components/home/PostCard';
import LoadingModal from '@/components/modal/LoadingModal';
import { PostType } from '@/module/type';
import axios from 'axios';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { motion, useScroll, useSpring } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Image from 'next/image';
import Calendar from '@/components/home/Calendar';
import { cn } from '@/utils/style';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data,
    refetch,
    isError,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<any, unknown, any>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await axios.get(`/api/posts?page=${pageParam}`, {
        params: { page: pageParam, limit: 10, category: selectedCategory },
      });

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios('/api/categories/');
      return response.data;
    },
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timer = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [fetchNext, fetchNextPage, hasNextPage, isPageEnd]);

  useEffect(() => {
    refetch();
  }, [refetch, selectedCategory]);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  if (isLoading || isCategoriesLoading) return <LoadingModal />;

  return (
    <>
      <Header />
      <motion.div
        className="fixed inset-x-0 top-14 z-20 h-2 origin-[0%] bg-neutral-500/40 backdrop-blur-lg"
        style={{ scaleX }}
      />
      <div className="relative mt-14 flex h-[700px] items-center justify-center gap-4">
        <Image
          src="/banner.png"
          alt="banner_img"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-2xl">
          <div className="text-xl font-bold">Never, Never, Never</div>
          <div className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
            Never give up
          </div>
          <Calendar />
          <div className="absolute bottom-0 flex h-16 w-screen items-center justify-center gap-2 overflow-x-scroll bg-white/40 backdrop-blur-xl">
            {['전체', ...categories]?.map((category: string) => (
              <div
                className={cn(
                  'cursor-pointer rounded-2xl border px-4 py-1 font-bold transition hover:bg-gray-300',
                  selectedCategory === category && 'border-blue-500',
                )}
                onClick={() => handleSelectCategory(category)}
                key={category}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center pb-16">
        <div className="relative flex w-full justify-center gap-1 md:max-w-2xl lg:max-w-6xl">
          <div className="grid grid-cols-3 justify-center gap-10">
            {data?.pages?.map((page: any, index: number) => (
              <Fragment key={index}>
                {page.data.map((post: PostType, i: number) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Fragment>
            ))}
            <div className="mb-10 h-10 w-full touch-none" ref={ref} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
