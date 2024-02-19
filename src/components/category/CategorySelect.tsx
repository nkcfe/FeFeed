import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useQuery } from 'react-query';

interface CategorySelectProps {
  selectCategory: (category: string) => void;
}

const CategorySelect = (props: CategorySelectProps) => {
  const { selectCategory } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('/api/categories');
      return response.data;
    },
  });

  const handleCategory = (category: string) => {
    setWord(category);
    selectCategory(category);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div
      className="relative flex w-40 items-center justify-center rounded-xl bg-white px-4 py-2 shadow-md"
      ref={ref}
    >
      <input
        placeholder="카테고리"
        className="w-28 text-sm outline-none"
        onFocus={() => setIsOpen(true)}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            selectCategory(word);
            setIsOpen(false);
          }
        }}
      />
      <IoMdArrowDropdown />
      {isOpen && (
        <div className="absolute top-10 z-10 flex w-40 flex-col items-start justify-center gap-2 rounded-xl bg-white p-2 shadow-md">
          {categories?.map((category: string, index: number) => (
            <div
              key={index}
              className="w-full cursor-pointer rounded-xl p-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
