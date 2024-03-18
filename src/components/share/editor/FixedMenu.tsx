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
import { Button } from '@/components/ui/button';
import TurnMenu from './TurnMenu';

const FixedMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const menuItems = [
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
    <div className="flex h-full items-center justify-start">
      <TurnMenu editor={editor} />
      {menuItems.map((item) => (
        <Button
          key={item.icon.toString()}
          className="h-full rounded-none border-x border-gray-50"
          variant="ghost"
          onClick={item.onClick}
        >
          <item.icon />
        </Button>
      ))}
    </div>
  );
};

export default FixedMenu;
