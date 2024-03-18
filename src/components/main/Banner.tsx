import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Londrina_Solid } from 'next/font/google';

const londrina = Londrina_Solid({
  weight: ['400'],
  subsets: ['latin'],
});

const Banner = () => {
  return (
    <div
      className={cn(
        'relative mt-24 flex h-60 items-center justify-center overflow-hidden font-semibold lg:text-[280px]',
        londrina.className,
      )}
    >
      {Array.from({ length: 5 }, (_, rowIndex) => (
        <div key={rowIndex} className="absolute top-[-570px]">
          <div
            className="absolute left-[50%] flex translate-x-[-50%]"
            aria-hidden
            style={{ top: `${rowIndex * 240}px` }}
          >
            {['B', 'E', 'Y', 'O', 'N', 'D'].map((letter, LetterIndex) => (
              <motion.span
                data-letter={letter}
                className={cn(
                  rowIndex !== 2 && ' text-neutral-100 dark:text-stone-900',
                )}
                key={`${letter}-${LetterIndex}`}
                animate={{
                  y:
                    LetterIndex % 2 === 0
                      ? ['0px', '480px']
                      : ['0px', '-480px'],
                }}
                transition={{
                  duration: 2.5,
                  delay: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 2.5,
                  ease: 'easeInOut',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
