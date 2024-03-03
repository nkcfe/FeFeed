import Button from '@/components/share/Button';
import ThemeButton from '@/components/share/ThemeButton';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';

interface WriteHeaderProps {
  handleSubmit: () => void;
  isEdit?: boolean;
  handleUpdate?: () => void;
}

const WriteHeader = (props: WriteHeaderProps) => {
  const { handleSubmit, isEdit, handleUpdate } = props;
  const router = useRouter();
  return (
    <div className="fixed top-0 w-screen bg-white/50 backdrop-blur-xl dark:bg-black/80">
      <div className="mx-auto flex h-14 items-center justify-between p-6 text-lg lg:max-w-6xl">
        <Button
          variant="white"
          weight="light"
          size="medium"
          shape="primary"
          onClick={() => router.back()}
        >
          돌아가기
        </Button>
        <div className="text-sm dark:text-white">
          {format(new Date(), 'yyyy년 MM월 dd일')}
        </div>
        <div className="flex gap-2">
          <ThemeButton />

          <Button
            variant="purple"
            weight="light"
            size="medium"
            shape="primary"
            onClick={isEdit ? handleUpdate : handleSubmit}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteHeader;
