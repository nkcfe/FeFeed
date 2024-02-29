import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import { NextLayout, NextProvider } from './provider';
import { cn } from '@/utils/style';

const raleway = Raleway({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '남궁철 블로그',
  description: '개발 관련 기술 블로그입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head></head>
      <body className={cn('dark:bg-black/90', raleway.className)}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
