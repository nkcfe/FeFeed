import { cn } from '@/utils/style';
import React from 'react';
import { IconType } from 'react-icons';

interface MenuButtonProps {
  icon: IconType;
  onClick: (v: string) => void;
  className: string;
  title?: string;
}

const MenuButton = (props: MenuButtonProps) => {
  const { icon: Icon, onClick, className, title } = props;
  return (
    <button
      onClick={() => onClick(title as string)}
      className={cn(
        'flex w-auto cursor-pointer items-center justify-start rounded p-2 text-gray-500 transition hover:bg-gray-100 dark:bg-neutral-700 dark:text-white dark:shadow-none dark:hover:bg-neutral-600',
        className,
      )}
    >
      <Icon size={16} className="" />
      {title && <div className="ml-2 text-xs">{title}</div>}
    </button>
  );
};

export default MenuButton;
