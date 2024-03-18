import React from 'react';
import { BsChatQuote } from 'react-icons/bs';
import { Londrina_Solid } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { TfiBackLeft } from 'react-icons/tfi';

const londrina = Londrina_Solid({
  weight: ['400'],
  subsets: ['latin'],
});

const Header = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 flex h-20 w-full items-center justify-center bg-white">
      <div
        className={cn(
          londrina.className,
          'relative flex w-full max-w-4xl items-center justify-start',
        )}
      >
        <Button
          variant="ghost"
          className="h-full gap-2"
          onClick={() => router.back()}
        >
          <TfiBackLeft size={25} />
          <div className="text-xl">Back</div>
        </Button>
        <div className="absolute left-[50%] mx-auto flex translate-x-[-50%] items-center justify-center gap-2">
          <BsChatQuote size={30} />
          <div className="text-4xl">New Chat</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
