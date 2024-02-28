import type { Metadata } from 'next';
import { Noto_Sans_KR, Overpass } from 'next/font/google';
import './globals.css';
import { NextLayout, NextProvider } from './provider';

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

const overpass = Overpass({
  weight: ['400', '700'],
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
      <body className={overpass.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
