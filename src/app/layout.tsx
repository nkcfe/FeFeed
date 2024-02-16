import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { NextLayout, NextProvider } from './provider';

const notoSansKr = Noto_Sans_KR({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FeFeed',
  description: 'Chul"s Blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.2/packages/wanted-sans/fonts/webfonts/static/complete/WantedSans.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.2/packages/wanted-sans/fonts/webfonts/static/complete/WantedSans.min.css"
        />
      </head>
      <body className={notoSansKr.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
