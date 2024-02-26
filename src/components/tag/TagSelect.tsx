import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';

interface TagSelectProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagSelect = (props: TagSelectProps) => {
  const { selectedTags, setSelectedTags } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axios.get('/api/tags');
      return response.data;
    },
  });

  const selectTag = (category: string) => {
    if (!selectedTags.includes(category)) {
      setSelectedTags((prev) => [...prev, category]);
    }
    setWord('');
    setIsOpen(false);
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
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex w-36 items-center justify-center rounded-xl bg-white px-4 py-2 shadow-md"
        ref={ref}
      >
        <input
          placeholder="태그명"
          data-cy="tag-input"
          className="w-24 text-sm outline-none"
          onFocus={() => setIsOpen(true)}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              selectTag(word);
            }
          }}
        />
        <IoMdArrowDropdown />
        {isOpen && (
          <div className="absolute top-10 z-10 flex w-36 flex-col items-start justify-center gap-2 rounded-xl bg-white p-2 shadow-md">
            {tags?.map((tag: string, index: number) => (
              <div
                key={index}
                className="w-full cursor-pointer rounded-xl p-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => selectTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 flex w-full items-center justify-center gap-1">
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className="rounded border border-gray-300 px-1.5 py-1 text-xs text-gray-500"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelect;
