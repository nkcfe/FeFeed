'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { createClient } from '@/libs/supabase/client';
import ThemeButton from '../ThemeButton';
import Logo from '../Logo';
import { Button } from '../../ui/button';
import { Sidebar } from './Sidebar';

const supabase = createClient();

interface HeaderProps {
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
  initialCategories: string[] | null;
}

const Header = (props: HeaderProps) => {
  const { selectedCategory, handleSelectCategory, initialCategories } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // async 함수는 Promsie를 반환하기 때문에 useEffect 내부에서 사용할 수 없다.
    // 따라서 즉시 실행 함수로 감싸주어야 한다.
    (async () => {
      const user = await supabase.auth.getUser();
      if (user.error) return;
      setIsAuthenticated(!!user.data.user);
    })();
  }, []);

  return (
    <div className="fixed top-0 z-[50] w-screen bg-white/50 backdrop-blur-xl dark:bg-black/80">
      <div className="mx-auto flex h-16 items-center justify-start p-6 text-lg lg:max-w-6xl">
        <Logo />

        <div className="ml-10 flex items-center justify-center gap-2">
          {isAuthenticated && (
            <Button variant="ghost" onClick={() => router.push('/write')}>
              POST
            </Button>
          )}
          <Button
            variant="ghost"
            custom='data-cy="admin"'
            onClick={() => router.push('/admin')}
          >
            ADMIN
          </Button>
          <Button
            variant="ghost"
            custom='data-cy="chatbot"'
            onClick={() => router.push('/chatbot')}
          >
            CHATBOT
          </Button>
        </div>

        <div className="ml-auto flex items-center justify-center gap-2">
          <ThemeButton />
          <Sidebar
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
            initialCategories={initialCategories}
            isSideOpen={isSideOpen}
            setIsSideOpen={setIsSideOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
