import type { Metadata } from 'next';
import { Noto_Sans_KR, Poppins, Nanum_Gothic } from 'next/font/google';
import './globals.css';
import { NextLayout, NextProvider } from './provider';
import { cn } from '@/utils/style';

const noto = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const nanum = Nanum_Gothic({
  weight: ['400', '800', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '남궁철의 블로그',
  description: '개인 개발 블로그',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn('dark:bg-neutral-900', nanum.className)}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
