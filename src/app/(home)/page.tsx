import PostCard from '@/components/home/PostCard';
import React from 'react';

const Home = () => {
  return (
    <div className="mt-20 flex min-h-[calc(100vh-42px)] flex-col items-center justify-start gap-16">
      <PostCard />
      <PostCard />
    </div>
  );
};

export default Home;
