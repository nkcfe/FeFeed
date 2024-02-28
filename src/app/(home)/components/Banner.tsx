import Image from 'next/image';
import React from 'react';
import Calendar from './Calendar';
import { useGetCategories } from '@/hooks/useGetCategories';
import LoadingModal from '@/components/modal/LoadingModal';
import { cn } from '@/utils/style';

interface BannerProps {
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
}

const Banner = (props: BannerProps) => {
  const { selectedCategory, handleSelectCategory } = props;

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories();

  if (isCategoriesLoading) return <LoadingModal />;

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
        <div className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-3xl font-extrabold text-transparent">
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
              data-cy="category"
              onClick={() => handleSelectCategory(category)}
              key={category}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
