'use client';

import Button from '@/components/share/Button';
import { createClient } from '@/libs/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react';

const supabase = createClient();

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="z-10 flex flex-col items-center justify-center">
      <div className=" text-5xl font-bold text-gray-200">Welcome!</div>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Button
          variant="blue"
          size="medium"
          weight="bold"
          custom="text-gray-600"
          onClick={() => router.push('/')}
        >
          홈 화면으로
        </Button>
        <Button
          variant="blue"
          size="medium"
          weight="bold"
          custom="text-gray-600"
          onClick={() => {
            supabase.auth.signOut();
            router.push('/');
          }}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
