import React from 'react';
import { AiFillFire } from 'react-icons/ai';
import Button from '@/components/Button';
import { usePathname, useRouter } from 'next/navigation';
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
        'sticky top-0 z-20 bg-white',
        isScrollDown && 'shadow-sm transition-all duration-300',
      )}
    >
      <div
        className={cn(
          'mx-auto flex h-14 items-center justify-between lg:max-w-4xl',
        )}
      >
        <Link href="/" className="border-none">
          <div className="flex">
            <AiFillFire size={22} />
            <span className="font-bold">Fe</span>
            <span>Feed</span>
          </div>
        </Link>
        <div className="flex gap-1">
          <div>
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
              챗봇
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
