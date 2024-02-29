'use client';

import Button from '@/components/share/Button';

import type { PostType } from '@/module/type';

import { format } from 'date-fns';
import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';

import { FaAngleDown } from 'react-icons/fa6';

import { useRouter } from 'next/navigation';
import { usePostDelete } from '@/hooks/usePostDelete';
import { createClient } from '@/libs/supabase/client';
import Header from '@/components/share/Header';
import Scroll from '@/components/share/Scroll';
import Footer from './Footer';

const supabase = createClient();

const PostPage: FC<PostType> = ({
  id,
  title,
  coverImage,
  description,
  content,
  createdAt,
  category,
  tags,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { deletePost, isDeleteSuccess } = usePostDelete(id);

  const handleScroll = () => {
    bodyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      router.push('/');
    }
  }, [isDeleteSuccess, router]);

  useEffect(() => {
    // async 함수는 Promsie를 반환하기 때문에 useEffect 내부에서 사용할 수 없다.
    // 따라서 즉시 실행 함수로 감싸주어야 한다.
    (async () => {
      const user = await supabase.auth.getUser();
      setIsAuthenticated(!!user.data.user);
    })();
  }, []);

  return (
    <>
      <Header />
      <Scroll />
      <div className="flex flex-col">
        <div className="h-[100vh] ">
          <div className="relative h-[90vh] w-screen object-cover">
            <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-black to-transparent" />

            <Image
              src={coverImage}
              alt={title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute bottom-20 left-[50%] z-10 flex translate-x-[-50%] flex-col items-center justify-center gap-4 text-white">
              <div className="text-6xl font-bold">{title}</div>
              <div className="mb-4 text-sm">
                {format(new Date(createdAt), 'yyyy.MM.dd')}
              </div>
              <Button shape="full" variant="gray" onClick={handleScroll}>
                <div className="flex items-center justify-center p-3 text-white">
                  <FaAngleDown size={20} />
                </div>
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
          </div>
          <div className="h-24" ref={bodyRef} />
        </div>

        <div className="mx-auto w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
          <Footer
            id={id}
            isAuthenticated={isAuthenticated}
            deletePost={deletePost}
          />
        </div>
      </div>
    </>
  );
};

export default PostPage;
