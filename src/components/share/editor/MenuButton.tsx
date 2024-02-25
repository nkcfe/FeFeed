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
        'flex w-auto cursor-pointer items-center justify-start rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200',
        className,
      )}
    >
      <Icon size={18} className="text-gray-500" />
      {title && <div className="ml-2 text-sm text-gray-500">{title}</div>}
    </button>
  );
};

export default MenuButton;
