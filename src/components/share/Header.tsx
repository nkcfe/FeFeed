import React, { useEffect, useState } from 'react';
import { AiFillFire } from 'react-icons/ai';
import Button from '@/components/share/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/libs/supabase/client';
import { cn } from '@/utils/style';
import ThemeButton from './ThemeButton';

const supabase = createClient();

interface HeaderProps {
  isScrollDown?: boolean;
  handleSubmit?: () => void;
  type?: 'write';
}

const Header = (props: HeaderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { handleSubmit, type } = props;
  const router = useRouter();

  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // async 함수는 Promsie를 반환하기 때문에 useEffect 내부에서 사용할 수 없다.
    // 따라서 즉시 실행 함수로 감싸주어야 한다.
    (async () => {
      const user = await supabase.auth.getUser();
      setIsAuthenticated(!!user.data.user);
    })();
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 z-30 w-screen bg-white/50 backdrop-blur-xl dark:bg-slate-800/90',
        isScrollDown && 'bg-slate-800 shadow-md transition-all duration-300',
      )}
    >
      <div className="mx-auto flex h-14 items-center justify-between p-6 text-lg lg:max-w-6xl">
        <Link
          href="/"
          className={cn('border-none', isScrollDown && 'text-white')}
        >
          <div className="flex items-center dark:text-white">
            <AiFillFire size={24} />
            <span className="font-bold">Fe</span>
            <span>Feed</span>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-1">
          <ThemeButton />
          <div>
            {type === 'write' ? (
              <>
                <Button
                  variant="white"
                  weight="light"
                  size="medium"
                  onClick={() => router.back()}
                >
                  돌아가기
                </Button>
                <Button
                  variant="blue"
                  weight="light"
                  size="medium"
                  onClick={handleSubmit}
                >
                  저장
                </Button>
              </>
            ) : (
              <>
                {isAuthenticated && (
                  <Button
                    variant={isScrollDown ? 'slate' : 'white'}
                    weight="bold"
                    size="medium"
                    onClick={() => router.push('/write')}
                  >
                    글 작성
                  </Button>
                )}

                <Button
                  variant={isScrollDown ? 'slate' : 'white'}
                  weight="bold"
                  size="medium"
                  custom='data-cy="admin"'
                  onClick={() => router.push('/admin')}
                >
                  어드민
                </Button>
                <Button
                  variant={isScrollDown ? 'slate' : 'white'}
                  weight="bold"
                  size="medium"
                  custom='data-cy="chatbot"'
                  onClick={() => router.push('/chatbot')}
                >
                  챗봇
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
