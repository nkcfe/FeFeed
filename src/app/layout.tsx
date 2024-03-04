import type { Metadata } from 'next';
import { Noto_Sans_KR, Poppins } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Devcamp Day1 Signup',
  description: '회원가입 폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn('dark:bg-neutral-900', noto.className, poppins.className)}
      >
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
