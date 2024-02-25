import { Editor } from '@tiptap/react';

import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { FaListOl, FaListUl } from 'react-icons/fa';

import MenuButton from './MenuButton';
import { toast } from 'react-toastify';
import { createClient } from '@/libs/supabase/client';
import { IoImageOutline } from 'react-icons/io5';

const supabase = createClient();

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
    {
      title: '이미지',
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
          const fileName = `${currentTime}_${file.name}`;
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
