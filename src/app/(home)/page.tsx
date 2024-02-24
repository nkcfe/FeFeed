'use client';

import Header from './Header';
import PostCard from '@/components/home/PostCard';
import LoadingModal from '@/components/modal/LoadingModal';
import { PostType } from '@/module/type';
import axios from 'axios';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Calendar from '@/components/Calendar';
import { motion, useScroll, useSpring } from 'framer-motion';
import Introduce from '@/components/Introduce';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useSelect from '@/hooks/useSelect';
import Dropdown from '@/components/dropdown';
import Item from '@/components/dropdown/Item';

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const { selected: category, selectHandler: categoryHandler } = useSelect({
    initialState: '모든 주제',
  });
  const { selected: year, selectHandler: yearHandler } = useSelect({
    initialState: '모든 연도',
  });
  const { selected: month, selectHandler: monthHandler } = useSelect({
    initialState: '모든 달',
  });

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

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios('/api/categories/');
      return response.data;
    },
  });
  const { data: years, isLoading: isYearsLoading } = useQuery({
    queryKey: ['years'],
    queryFn: async () => {
      const response = await axios('/api/years/');
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

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isLoading || isCategoriesLoading || isYearsLoading)
    return <LoadingModal />;

  return (
    <>
      <Header />
      <div className="mt-14 flex h-28 w-screen items-center justify-center gap-4 bg-gray-100">
        <div className="text-sm">필터</div>
        <Dropdown type="filter" selected={category}>
          {['모든 주제', ...categories].map((categoryOption: string) => (
            <Item
              key={categoryOption}
              item={categoryOption}
              onClick={categoryHandler}
            />
          ))}
        </Dropdown>
        <Dropdown type="filter" selected={year}>
          {['모든 연도', ...years].map((yearOption: string) => (
            <Item key={yearOption} item={yearOption} onClick={yearHandler} />
          ))}
        </Dropdown>
        <Dropdown type="filter" selected={month}>
          {[
            '모든 달',
            ...Array.from({ length: 12 }, (_, index) => `${index + 1}월`),
          ].map((monthOption: string) => (
            <Item key={monthOption} item={monthOption} onClick={monthHandler} />
          ))}
        </Dropdown>
      </div>

      <motion.div
        className="fixed inset-x-0 top-14 z-20 h-2 origin-[0%] bg-neutral-500/40 backdrop-blur-lg"
        style={{ scaleX }}
      />
      <div className="mt-16 flex justify-center pb-16">
        <div className="relative flex w-full justify-center gap-1 md:max-w-2xl lg:max-w-4xl">
          <div className="grid grid-cols-2 justify-center gap-10">
            <div className="col-span-2">
              <Calendar />
            </div>
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
