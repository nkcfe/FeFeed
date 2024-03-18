import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Editor } from '@tiptap/react';
import { FaListOl, FaListUl } from 'react-icons/fa';
import { createClient } from '@/libs/supabase/client';
import { IoImageOutline } from 'react-icons/io5';
import {
  LuBold,
  LuCode2,
  LuStrikethrough,
  LuItalic,
  LuHeading1,
  LuHeading2,
  LuHeading3,
} from 'react-icons/lu';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';

const supabase = createClient();

interface TurnMenuProps {
  editor: Editor | null;
}

const TurnMenu = (props: TurnMenuProps) => {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  const menuItems = [
    {
      title: 'Heading 1',
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: LuHeading1,
      className: editor.isActive('heading', { level: 1 })
        ? 'bg-gray-100'
        : 'bg-white',
    },
    {
      title: 'Heading 2',
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: LuHeading2,
      className: editor.isActive('heading', { level: 2 })
        ? 'bg-gray-100'
        : 'bg-white',
    },
    {
      title: 'Heading 3',
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: LuHeading3,
      className: editor.isActive('heading', { level: 3 })
        ? 'bg-gray-100'
        : 'bg-white',
    },
    {
      title: 'Ordered List',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      icon: FaListUl,
      className: editor.isActive('bulletList') ? 'bg-gray-100' : 'bg-white',
    },
    {
      title: 'Bulleted List',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      icon: FaListOl,
      className: editor.isActive('orderedList') ? 'bg-gray-100' : 'bg-white',
    },
    {
      title: 'Image Upload',
      onClick: async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        const changeHandler = async () => {
          const toastId = toast.loading('파일을 업로드 중입니다.');
          const file = input.files?.[0];
          const fileSize = file?.size;
          if (!file) return null;
          if (fileSize && fileSize > 1024 * 1024 * 10) {
            toast.dismiss(toastId);
            toast.error('파일 크기는 10MB를 넘을 수 없습니다.');
            return;
          }
          const currentTime = new Date().toISOString();
          const fileName = `${currentTime}`;
          const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file);

          if (error) {
            toast.dismiss(toastId);
            toast.error('파일 업로드에 실패했습니다.');
          }
          if (data) {
            const imageData = supabase.storage
              .from('images')
              .getPublicUrl(fileName);
            toast.dismiss(toastId);
            toast.success('파일 업로드에 성공했습니다.');
            return editor
              .chain()
              .focus()
              .setImage({ src: imageData.data.publicUrl as unknown as string })
              .run();
          }
        };

        input.addEventListener('change', changeHandler);
      },
      icon: IoImageOutline,
      className: 'bg-white',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-full rounded-none border-x border-gray-50 text-xs"
          variant="ghost"
        >
          Turn Into
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28 gap-2">
        <DropdownMenuGroup className="flex flex-col gap-1">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={item.icon.toString()}
              className={cn('text-xs', item.className)}
              onClick={item.onClick}
            >
              <div>{item.title}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TurnMenu;
