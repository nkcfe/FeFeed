import React from 'react';
import Button from '../share/Button';
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface HeaderProps {
  handleSubmit: () => void;
}

const WriteHeader = (props: HeaderProps) => {
  const { handleSubmit } = props;

  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 mx-auto flex h-14 items-center justify-center bg-white lg:max-w-4xl">
      <div className="flex w-full justify-between gap-1">
        <Button
          variant="white"
          weight="light"
          size="medium"
          onClick={() => router.back()}
        >
          <div className="flex items-center justify-center gap-1">
            <IoIosArrowRoundBack size={20} />
            돌아가기
          </div>
        </Button>
        <Button
          variant="blue"
          weight="light"
          size="medium"
          onClick={handleSubmit}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

export default WriteHeader;
