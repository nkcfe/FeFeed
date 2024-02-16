import React from 'react';
import { AiFillFire } from 'react-icons/ai';
import Button from './Button';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-14 items-center justify-between lg:max-w-4xl">
      <div className="flex">
        <AiFillFire size={24} />
        <span className="font-bold">Fe</span>
        <span>Feed</span>
      </div>
      <div className="flex gap-1">
        <Button
          variant="white"
          weight="light"
          size="medium"
          onClick={() => router.push('/write')}
        >
          글 작성
        </Button>
        <Button
          variant="white"
          weight="light"
          size="medium"
          onClick={() => router.push('/chatbot')}
        >
          챗 봇
        </Button>
      </div>
    </div>
  );
};

export default Header;
