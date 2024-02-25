import React from 'react';
import { AiFillFire } from 'react-icons/ai';
import Button from '../share/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/style';

interface HeaderProps {
  isScrollDown?: boolean;
}

const Header = (props: HeaderProps) => {
  const { isScrollDown } = props;
  const router = useRouter();

  return (
    <div
      className={cn(
        'fixed top-0 z-20 w-full bg-white',
        isScrollDown && 'bg-slate-800 shadow-md transition-all duration-300',
      )}
    >
      <div
        className={cn(
          'mx-auto flex h-14 items-center justify-between lg:max-w-6xl',
        )}
      >
        <Link
          href="/"
          className={cn('border-none', isScrollDown && 'text-white')}
        >
          <div className="flex">
            <AiFillFire size={22} />
            <span className="font-bold">Fe</span>
            <span>Feed</span>
          </div>
        </Link>
        <div className="flex gap-1">
          <div>
            <Button
              variant={isScrollDown ? 'slate' : 'white'}
              weight="light"
              size="medium"
              onClick={() => router.push('/write')}
            >
              글 작성
            </Button>
            <Button
              variant={isScrollDown ? 'slate' : 'white'}
              weight="light"
              size="medium"
              onClick={() => router.push('/chatbot')}
            >
              챗봇
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
