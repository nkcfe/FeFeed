'use client';

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { PostType } from '@/module/type';

import { useGetPosts } from '@/hooks/useGetPosts';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import PostCard from '@/components/main/PostCard';
import Header from '@/components/share/navigation/Header';
import Footer from '@/components/share/Footer';
import Tags from './Tags';
import Banner from './Banner';

import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface PostListProps {
  initialPosts: { data: PostType[]; page: number } | null;
  initialCategories: string[] | null;
  initialTags: string[] | null;
}

const PostList = (props: PostListProps) => {
  const { initialPosts, initialCategories, initialTags } = props;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const {
    data,
    refetch,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetPosts(selectedCategory, selectedTag, initialPosts);

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      toast.error('게시글을 불러오는데 실패했습니다.');
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
  }, [refetch, selectedCategory, selectedTag]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="mt-16 min-h-screen w-full dark:bg-stone-900">
      <Header
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
        initialCategories={initialCategories}
      />
      <div className="relative z-40 overflow-hidden bg-white/40 py-32 backdrop-blur-2xl dark:bg-stone-800/10">
        <Image
          src="/banner.png"
          alt="banner"
          fill
          priority
          className="absolute z-[-10] size-full object-center"
        />
        <Banner />
        <Tags
          tags={initialTags}
          selectedTag={selectedTag}
          handleSelectTag={handleSelectTag}
        />
      </div>
      <div className="mt-12 flex justify-center pb-16">
        <div className="relative w-full justify-center gap-1 md:max-w-2xl lg:max-w-6xl">
          <div className="text-2xl font-semibold">Latest Posts</div>
          <div className="mt-8 grid items-start justify-start gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.pages?.map((page: any, index: number) => (
              <Fragment key={index}>
                {page.data.map((post: PostType) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div
        className="mb-10 flex h-52 w-full touch-none items-center justify-center"
        ref={ref}
      >
        {isFetchingNextPage && <ClipLoader size={50} color="#ce60df" />}
      </div>
      <Footer />
    </div>
  );
};

export default PostList;
