import {
  LuBold,
  LuCode2,
  LuStrikethrough,
  LuItalic,
  LuHeading1,
  LuHeading2,
  LuHeading3,
} from 'react-icons/lu';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { Editor } from '@tiptap/react';

import MenuButton from './MenuButton';

const Menu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const menuItems = [
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: LuHeading1,
      className: editor.isActive('heading', { level: 1 })
        ? 'bg-gray-200 dark:bg-neutral-600'
        : 'bg-white dark:bg-neutral-700',
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: LuHeading2,
      className: editor.isActive('heading', { level: 2 })
        ? 'bg-gray-200 dark:bg-neutral-600'
        : 'bg-white dark:bg-neutral-700',
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: LuHeading3,
      className: editor.isActive('heading', { level: 3 })
        ? 'bg-gray-200 dark:bg-neutral-600'
        : 'bg-white dark:bg-neutral-700',
    },
    {
      icon: LuBold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      className: editor.isActive('bold')
        ? 'bg-gray-200 dark:bg-neutral-500'
        : 'bg-white dark:bg-neutral-700',
    },
    {
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      icon: LuCode2,
      className: editor.isActive('codeBlock')
        ? 'bg-gray-200 dark:bg-neutral-600'
        : 'bg-white dark:bg-neutral-700',
    },
    {
      onClick: () => editor.chain().focus().toggleStrike().run(),
      icon: LuStrikethrough,
      className: editor.isActive('strike')
        ? 'bg-gray-200 dark:bg-neutral-600'
        : 'bg-white dark:bg-neutral-700',
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      icon: LuItalic,
      className: editor.isActive('italic')
        ? 'bg-gray-200 dark:bg-neutral-600'
        : 'bg-white dark:bg-neutral-700',
    },
    {
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      icon: RiDoubleQuotesL,
      className: editor.isActive('blockquote')
        ? 'bg-gray-200 dark:bg-neutral-600'
        : 'bg-white dark:bg-neutral-700',
    },
  ];

  return (
    <div className="absolute bottom-0 left-[-1.75rem] inline-flex gap-2 rounded bg-white p-1 shadow-md shadow-gray-300 dark:bg-neutral-700 dark:shadow-none">
      {menuItems.map((item) => (
        <MenuButton
          key={item.icon.toString()}
          onClick={item.onClick}
          icon={item.icon}
          className={item.className}
        />
      ))}
    </div>
  );
};

export default Menu;
