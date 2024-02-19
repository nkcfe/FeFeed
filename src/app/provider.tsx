'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props {
  children: React.ReactNode;
}

const client = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={client}>
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={false}
        position="top-center"
        hideProgressBar
        bodyClassName={'text-sm p-3 w-10'}
        transition={Zoom}
      />
      {children}
    </QueryClientProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <main className="mx-auto h-full">{children}</main>
    </>
  );
};