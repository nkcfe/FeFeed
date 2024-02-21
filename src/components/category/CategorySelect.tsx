import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useQuery } from 'react-query';
import { MdClose } from 'react-icons/md';

interface CategorySelectProps {
  category: string;
  selectCategory: (category: string) => void;
}

const CategorySelect = (props: CategorySelectProps) => {
  const { selectCategory, category } = props;
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
    setWord('');
    selectCategory(category);
    setIsOpen(false);
  };

  const handleDeleteCateogry = () => {
    selectCategory('');
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
      className="relative flex h-10 w-40 items-center justify-between rounded-xl bg-white px-4 py-2 shadow-md"
      ref={ref}
    >
      {category ? (
        <div
          className="flex w-auto cursor-pointer items-center justify-center rounded border border-gray-300 px-1 text-sm text-gray-500 transition hover:border-blue-400 hover:text-blue-400"
          onClick={handleDeleteCateogry}
        >
          <div>{category}</div>
          <MdClose size={16} />
        </div>
      ) : (
        <input
          placeholder="카테고리"
          ref={inputRef}
          className="w-28 text-sm outline-none"
          onFocus={() => setIsOpen(true)}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCategory(word);
            }
          }}
        />
      )}

      <IoMdArrowDropdown />
      {isOpen && (
        <div className="absolute left-0 top-11 z-10 flex w-40 flex-col items-start justify-center gap-2 rounded-xl bg-white p-2 shadow-md">
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
