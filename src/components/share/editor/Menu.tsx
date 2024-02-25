import {
  LuBold,
  LuCode2,
  LuStrikethrough,
  LuItalic,
  LuHeading1,
  LuHeading2,
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
        ? 'bg-gray-200'
        : 'bg-white',
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: LuHeading2,
      className: editor.isActive('heading', { level: 2 })
        ? 'bg-gray-200'
        : 'bg-white',
    },
    {
      icon: LuBold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      className: editor.isActive('bold') ? 'bg-gray-200' : 'bg-white',
    },
    {
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      icon: LuCode2,
      className: editor.isActive('codeBlock') ? 'bg-gray-200' : 'bg-white',
    },
    {
      onClick: () => editor.chain().focus().toggleStrike().run(),
      icon: LuStrikethrough,
      className: editor.isActive('strike') ? 'bg-gray-200' : 'bg-white',
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      icon: LuItalic,
      className: editor.isActive('italic') ? 'bg-gray-200' : 'bg-white',
    },
    {
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      icon: RiDoubleQuotesL,
      className: editor.isActive('blockquote') ? 'bg-gray-200' : 'bg-white',
    },
  ];

  return (
    <div className="absolute bottom-0 left-[-1.75rem] inline-flex gap-2 rounded-xl bg-white p-1 shadow-md shadow-gray-300">
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
