import React from 'react';
import { TbUniverse } from 'react-icons/tb';
import { Londrina_Solid } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import IconButton from '@/components/share/IconButton';
import { AiFillGithub } from 'react-icons/ai';
import Link from 'next/link';

const londrina = Londrina_Solid({
  weight: ['400'],
  subsets: ['latin'],
});

const Footer = () => {
  return (
    <div
      className={cn(
        'mt-40 flex h-96 items-center justify-center bg-black',
        londrina.className,
      )}
    >
      <div className="w-full lg:max-w-6xl">
        <div className="flex flex-col">
          <div className="flex items-center text-white">
            <svg width="0" height="0">
              <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="#f09433" offset="0%" />
                <stop stopColor="#e6683c" offset="25%" />
                <stop stopColor="#dc2743" offset="50%" />
                <stop stopColor="#cc2366" offset="75%" />
                <stop stopColor="#bc1888" offset="100%" />
              </linearGradient>
            </svg>
            <TbUniverse size={46} style={{ fill: 'url(#gradient)' }} />
          </div>
          <div className="text-2xl font-bold text-white">FeFeed</div>
          <div className="mt-2 text-white">Beyond the Universe</div>
        </div>
        <Separator className="my-10" />
        <div className="flex items-center justify-between text-white">
          <div>2024 Chul&apos;s Blog</div>
          <IconButton
            Icon={AiFillGithub}
            component={Link}
            label="instagramLink"
            href="https://www.instagram.com/dhoonjang"
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
