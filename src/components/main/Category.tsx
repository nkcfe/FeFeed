import { Button } from '@/components/ui/button';
import { useGetCategories } from '@/hooks/useGetCategories';
import { cn } from '@/utils/style';
import React from 'react';
import { RiListIndefinite } from 'react-icons/ri';

interface CategoryProps {
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
  initialCategories: string[] | null;
  setIsSideOpen: (isOpen: boolean) => void;
}

const Category = (props: CategoryProps) => {
  const {
    selectedCategory,
    handleSelectCategory,
    initialCategories,
    setIsSideOpen,
  } = props;

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories(initialCategories);

  const handleSelect = (category: string) => {
    handleSelectCategory(category);
    setIsSideOpen(false);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="flex w-full flex-col items-start justify-center gap-1 overflow-x-scroll lg:max-w-6xl">
        {isCategoriesLoading ? (
          <div>Loading...</div>
        ) : (
          ['ALL', ...categories]?.map((category: string, index: number) => (
            <Button
              variant="ghost"
              data-cy="category"
              className={cn(
                'h-10 w-full justify-start gap-4',
                selectedCategory === category ? 'bg-gray-100' : '',
              )}
              onClick={() => handleSelect(category)}
              key={category}
            >
              <RiListIndefinite size={20} />
              {category}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
