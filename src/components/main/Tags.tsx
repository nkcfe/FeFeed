import { cn } from '@/lib/utils';
import React from 'react';

interface TagsProps {
  tags: string[] | null;
  selectedTag: string | null;
  handleSelectTag: (tag: string) => void;
}

const Tags = (props: TagsProps) => {
  const { tags, handleSelectTag, selectedTag } = props;
  return (
    <div className="mt-14 flex items-center justify-center ">
      <div className="flex flex-wrap items-center justify-center gap-2 lg:max-w-lg">
        {['ALL', ...(tags || [])]?.map((tag) => (
          <div
            key={tag}
            onClick={() => handleSelectTag(tag)}
            className={cn(
              'cursor-pointer rounded-3xl bg-gray-100 p-2 px-3 text-xs font-semibold text-black transition-colors hover:bg-gray-200 dark:bg-stone-900 dark:text-neutral-100 dark:hover:bg-stone-800',
              selectedTag === tag
                ? 'bg-gray-200 text-blue-400 dark:bg-stone-800 dark:text-white'
                : '',
            )}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
