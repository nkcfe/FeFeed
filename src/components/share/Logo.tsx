import Link from 'next/link';
import React from 'react';
import { TbUniverse } from 'react-icons/tb';

import { Londrina_Solid } from 'next/font/google';
import { cn } from '@/lib/utils';

const londrina = Londrina_Solid({
  weight: ['400'],
  subsets: ['latin'],
});

const Logo = () => {
  return (
    <Link href="/" className={cn('border-none', londrina.className)}>
      <div className="flex items-center text-2xl dark:text-white">
        <svg width="0" height="0">
          <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#f09433" offset="0%" />
            <stop stopColor="#e6683c" offset="25%" />
            <stop stopColor="#dc2743" offset="50%" />
            <stop stopColor="#cc2366" offset="75%" />
            <stop stopColor="#bc1888" offset="100%" />
          </linearGradient>
        </svg>
        <TbUniverse size={24} style={{ fill: 'url(#gradient)' }} />
        <span className="font-bold">Fe</span>
        <span>Feed</span>
      </div>
    </Link>
  );
};

export default Logo;
