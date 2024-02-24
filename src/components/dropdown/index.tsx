import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { cn } from '@/utils/style';
import { motion } from 'framer-motion';

interface DropdownProps {
  children?: ReactNode;
  selected?: string;
  type?: 'editor' | 'filter';
  className?: string;
}

const Dropdown = (props: DropdownProps) => {
  const { children, selected, type, className } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'relative z-20 flex cursor-pointer items-center justify-between bg-white transition',
        isOpen ? 'rounded-t-lg shadow-2xl' : 'rounded-lg',
        type === 'editor' ? 'w-20 px-2 text-gray-500' : 'h-8 w-36 px-4',
        className,
      )}
      onClick={toggleHandler}
    >
      <div className="text-sm">{selected}</div>
      <MdOutlineKeyboardArrowDown />
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'absolute left-0 top-8 flex h-auto w-36 flex-col items-start justify-center gap-2  bg-white p-2 shadow-2xl',
            type === 'editor' ? 'w-20 rounded-lg' : 'w-36 rounded-b-lg',
          )}
          onClick={toggleHandler}
        >
          {children}
        </motion.ul>
      )}
    </div>
  );
};

export default Dropdown;
