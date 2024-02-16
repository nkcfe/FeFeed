'use client';

import Header from '@/components/Header';
import { usePathname } from 'next/navigation';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

interface Props {
  children: React.ReactNode;
}

const client = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={client}>
      <ToastContainer />
      {children}
    </QueryClientProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  const path = usePathname();

  return (
    <>
      <Header />
      <main className="h-full w-screen">{children}</main>
    </>
  );
};
