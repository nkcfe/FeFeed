import Image from 'next/image';
import React from 'react';
import Calendar from './Calendar';
import Category from './Category';

interface BannerProps {
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
}

const Banner = (props: BannerProps) => {
  const { selectedCategory, handleSelectCategory } = props;

  return (
    <div className="relative mt-14 flex h-[700px] items-center justify-center gap-4">
      <Image
        src="/banner.png"
        alt="banner_img"
        fill
        sizes="(min-width: 640px) 100vw, 100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-2xl dark:bg-black/80">
        <div className="text-xl font-bold text-black dark:text-white ">
          Never, Never, Never
        </div>
        <div className="h-10 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-3xl font-extrabold text-transparent">
          Never give up
        </div>
        <Calendar />
        <Category
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
      </div>
    </div>
  );
};

export default Banner;
