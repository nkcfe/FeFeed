import { Editor } from '@tiptap/react';

import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { FaListOl, FaListUl } from 'react-icons/fa';

import MenuButton from './MenuButton';

const VerticalMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const textItems = [
    {
      title: '헤딩 1',
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: LuHeading1,
      className: editor.isActive('heading', { level: 1 })
        ? 'bg-gray-200'
        : 'bg-white',
    },
    {
      title: '헤딩 2',
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: LuHeading2,
      className: editor.isActive('heading', { level: 2 })
        ? 'bg-gray-200'
        : 'bg-white',
    },
    {
      title: '리스트',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      icon: FaListUl,
      className: editor.isActive('bulletList') ? 'bg-gray-200' : 'bg-white',
    },
    {
      title: '숫자 리스트',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      icon: FaListOl,
      className: editor.isActive('orderedList') ? 'bg-gray-200' : 'bg-white',
    },
  ];

  return (
    <div className="absolute left-[-10px] top-4 flex w-32 flex-col gap-3 rounded-2xl bg-white p-2 shadow-md shadow-gray-300">
      {textItems.map((item) => (
        <MenuButton
          title={item.title}
          key={item.icon.toString()}
          onClick={item.onClick}
          icon={item.icon}
          className={item.className}
        />
      ))}
    </div>
  );
};

export default VerticalMenu;
