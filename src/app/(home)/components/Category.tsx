import { useGetCategories } from '@/hooks/useGetCategories';
import { cn } from '@/utils/style';
import React from 'react';

interface CategoryProps {
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
  initialCategories: string[] | null;
}

const Category = (props: CategoryProps) => {
  const { selectedCategory, handleSelectCategory, initialCategories } = props;

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories(initialCategories);

  return (
    <div className="absolute bottom-0 flex h-16 w-screen items-center justify-center gap-2 overflow-x-scroll bg-white/40 backdrop-blur-xl dark:bg-white/10">
      {isCategoriesLoading ? (
        <div>Loading...</div>
      ) : (
        ['전체', ...categories]?.map((category: string) => (
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-1 font-bold transition hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800',
              selectedCategory === category && 'border-purple-600',
            )}
            data-cy="category"
            onClick={() => handleSelectCategory(category)}
            key={category}
          >
            {category}
          </div>
        ))
      )}
    </div>
  );
};

export default Category;
