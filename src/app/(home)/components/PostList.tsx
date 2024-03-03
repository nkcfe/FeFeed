'use client';

import Header from '@/components/share/Header';
import PostCard from '@/app/(home)/components/PostCard';
import LoadingModal from '@/components/modal/LoadingModal';
import { PostType } from '@/module/type';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Scroll from '@/components/share/Scroll';
import Banner from './Banner';
import { useGetPosts } from '@/hooks/useGetPosts';
import { ClipLoader } from 'react-spinners';

interface PostListProps {
  initialPosts: { data: PostType[]; page: number } | null;
}

const PostList = (props: PostListProps) => {
  const initialPosts = props.initialPosts;
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

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
  } = useGetPosts(selectedCategory, initialPosts);

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

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Scroll />
      <Banner
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
      />
      <div className="mt-16 flex justify-center pb-16">
        <div className="relative flex w-full justify-center gap-1 md:max-w-2xl lg:max-w-6xl">
          <div className="grid justify-center gap-10 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <LoadingModal />
            ) : (
              data?.pages?.map((page: any, index: number) => (
                <Fragment key={index}>
                  {page.data.map((post: PostType) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </Fragment>
              ))
            )}
          </div>
        </div>
      </div>
      <div
        className="mb-10 flex h-52 w-full touch-none items-center justify-center"
        ref={ref}
      >
        {isFetchingNextPage && <ClipLoader size={50} color="#ce60df" />}
      </div>
    </>
  );
};

export default PostList;
