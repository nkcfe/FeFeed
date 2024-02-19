'use client';

import Header from './Header';
import PostCard from '@/components/home/PostCard';
import LoadingModal from '@/components/modal/LoadingModal';
import { PostType } from '@/module/type';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const Home = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<PostType[]> => {
      const response = await axios.get('/api/posts');
      return response.data;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <LoadingModal />;

  return (
    <>
      <Header isScrollDown={isScrollDown} />
      <div className="mt-20 flex min-h-[calc(100vh-42px)] flex-col items-center justify-start gap-16">
        {Array.isArray(data) &&
          data?.map((post: any, index: number) => (
            <PostCard key={index} post={post} />
          ))}
      </div>
    </>
  );
};

export default Home;
