import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { MdClose } from 'react-icons/md';

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

  console.log(selectedTags);

  const selectTag = (category: string) => {
    if (!selectedTags.includes(category)) {
      setSelectedTags((prev) => [...prev, category]);
    }
    setWord('');
    setIsOpen(false);
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
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
    <div className="flex flex-col items-start justify-center">
      <div
        className="relative flex min-w-40 items-center justify-center rounded bg-neutral-200 p-2 px-3 shadow-sm dark:bg-neutral-600"
        ref={ref}
      >
        <input
          placeholder="태그명"
          data-cy="tag-input"
          className="min-w-28 bg-transparent text-sm outline-none dark:text-white dark:placeholder:text-gray-200"
          onFocus={() => setIsOpen(true)}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              selectTag(word);
            }
          }}
        />
        <IoMdArrowDropdown className="dark:text-white" />
        {isOpen && (
          <div className="absolute top-10 z-10 flex w-36 min-w-[10.5rem] flex-col items-start justify-center gap-2 rounded bg-neutral-200 p-2 shadow-sm dark:bg-neutral-600">
            {tags?.map((tag: string, index: number) => (
              <div
                key={index}
                className="w-full cursor-pointer rounded p-2 text-sm text-gray-700 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-500"
                onClick={() => selectTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 flex w-full items-center justify-start gap-1">
        {selectedTags.map((tag, index) => (
          <div
            key={tag}
            className="flex w-auto cursor-pointer items-center justify-center rounded border border-gray-300 px-1 text-sm text-gray-500 transition hover:border-blue-400 hover:text-blue-400"
            onClick={() => handleDeleteTag(tag)}
          >
            <div className="p-1 text-xs dark:text-white">{tag}</div>
            <MdClose size={16} className="dark:text-blue-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelect;
