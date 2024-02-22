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
import { useInfiniteQuery } from '@tanstack/react-query';
import Calendar from '@/components/Calendar';
import { motion, useScroll, useSpring } from 'framer-motion';
import Introduce from '@/components/Introduce';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const Home = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data,
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
        params: { page: pageParam, limit: 10 },
      });

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timer = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [fetchNext, fetchNextPage, hasNextPage, isPageEnd]);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isLoading) return <LoadingModal />;

  return (
    <>
      <Header isScrollDown={isScrollDown} />
      <motion.div
        className="fixed inset-x-0 top-14 z-20 h-2 origin-[0%] bg-slate-200"
        style={{ scaleX }}
      />
      <div className="mt-16 flex justify-center pb-16">
        <div className="relative flex w-full justify-center gap-2 lg:max-w-5xl">
          <div className="grid w-3/4 grid-cols-2">
            {data?.pages?.map((page: any, index: number) => (
              <Fragment key={index}>
                {page.data.map((post: PostType, i: number) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Fragment>
            ))}

            <div className="mb-10 h-10 w-full touch-none" ref={ref} />
          </div>

          <div className="mt-10 w-1/4">
            <div className="sticky top-20">
              <Introduce />
            </div>
            <div className="sticky top-20 mt-10">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
