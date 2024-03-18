import ThemeButton from '@/components/share/ThemeButton';
import FixedMenu from '@/components/share/editor/FixedMenu';
import Menu from '@/components/share/editor/Menu';
import { Button } from '@/components/ui/button';
import { Editor } from '@tiptap/react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

interface WriteHeaderProps {
  editor: Editor | null;
}

const Header = (props: WriteHeaderProps) => {
  const { editor } = props;
  const router = useRouter();
  return (
    <div className="fixed top-0 z-50 flex h-12 w-full items-center justify-start border-b bg-white">
      <Button
        variant="ghost"
        className="h-full gap-2 rounded-none"
        onClick={() => router.back()}
      >
        <IoArrowBackOutline />
        <div className="text-xs">Back</div>
      </Button>
      <FixedMenu editor={editor} />
      <div className="ml-auto flex items-center justify-center pr-4 text-sm">
        {format(new Date(), 'yyyy년 MM월 dd일')}
      </div>
    </div>
  );
};

export default Header;
