'use client';

import type { PostType } from '@/module/type';

import { format } from 'date-fns';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { BiSolidCategory } from 'react-icons/bi';

import { useRouter } from 'next/navigation';
import { usePostDelete } from '@/hooks/usePostDelete';
import { createClient } from '@/libs/supabase/client';
import Footer from '../share/Footer';
import ReactHtmlParser, { Transform } from 'react-html-parser';

import { toHtml } from 'hast-util-to-html';
import { lowlight } from '@/utils/lowlight';
import Header from './Header';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const supabase = createClient();

const PostPage: FC<PostType> = ({
  id,
  title,
  coverImage,
  description,
  content,
  createdAt,
  category,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const { deletePost, isDeleteSuccess } = usePostDelete(id);

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

  const transform: Transform = (node, index) => {
    if (node.type === 'tag' && node.name === 'pre') {
      const code = node.children?.[0]?.children?.[0]?.data ?? '';
      const highlightedCode = lowlight.highlightAuto(code);
      console.log(highlightedCode);
      return (
        <pre
          key={index}
          dangerouslySetInnerHTML={{ __html: toHtml(highlightedCode) }}
        />
      );
    }
  };

  return (
    <div className="mt-32 min-h-screen w-full dark:bg-stone-900">
      <Header
        isAuthenticated={isAuthenticated}
        id={id}
        deletePost={deletePost}
      />

      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-start sm:max-w-lg md:max-w-2xl lg:max-w-6xl">
        <div className="flex items-center justify-center gap-2">
          <BiSolidCategory size={20} />
          <div className="font-semibold">{category}</div>
        </div>
        <div className="mt-8 text-center text-5xl font-extrabold leading-relaxed">
          {title}
        </div>
        <div className="mt-6 text-xl">{description}</div>
        <div className="relative mt-14 h-[600px] w-full overflow-hidden rounded-2xl">
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            className="absolute m-0 size-full object-cover object-center"
          />
        </div>

        <div className="mt-14 flex w-full flex-col items-center justify-between lg:max-w-3xl">
          <div className="flex w-full items-center justify-between">
            <Badge variant="outline" className="rounded-2xl text-sm">
              {category}
            </Badge>
            <div className="text-xs text-gray-500">
              {format(new Date(createdAt), 'yyyy년 MM월 dd일')}
            </div>
          </div>
          <Separator className="my-6" />
        </div>

        <div className="w-full lg:max-w-3xl">
          {ReactHtmlParser(content ?? '', { transform })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
