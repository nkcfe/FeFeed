import React, { useEffect, useState } from 'react';
import { AiFillFire } from 'react-icons/ai';
import Button from '@/components/share/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/libs/supabase/client';

const supabase = createClient();

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // async 함수는 Promsie를 반환하기 때문에 useEffect 내부에서 사용할 수 없다.
    // 따라서 즉시 실행 함수로 감싸주어야 한다.
    (async () => {
      const user = await supabase.auth.getUser();
      setIsAuthenticated(!!user.data.user);
    })();
  }, []);

  return (
    <div className="fixed top-0 z-30 w-screen bg-white/50 backdrop-blur-xl">
      <div className="mx-auto flex h-14 items-center justify-between p-6 text-lg lg:max-w-6xl">
        <Link href="/" className="border-none">
          <div className="flex items-center">
            <AiFillFire size={24} />
            <span className="font-bold">Fe</span>
            <span>Feed</span>
          </div>
        </Link>
        <div className="flex gap-1">
          <div>
            {isAuthenticated && (
              <Button
                variant="white"
                weight="light"
                size="medium"
                onClick={() => router.push('/write')}
              >
                글 작성
              </Button>
            )}

            <Button
              variant="white"
              weight="light"
              size="medium"
              custom='data-cy="chatbot"'
              onClick={() => router.push('/chatbot')}
            >
              챗봇
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
