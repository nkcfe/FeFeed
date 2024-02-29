'use client';

import { PostType } from '@/module/type';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ChatPostCard = (props: PostType) => {
  const { id, title, coverImage, description, createdAt } = props;

  const router = useRouter();

  return (
    <div
      className="my-4 flex flex-1 cursor-pointer justify-start gap-3 rounded-2xl bg-neutral-200 p-3 px-4 transition duration-300 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
      onClick={() => router.push(`/posts/${id}`)}
    >
      <Image
        src={coverImage}
        alt={title}
        className="size-14 rounded"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-start justify-center">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs">{description}</div>
        <div className="text-xs">{format(createdAt, 'yyyy.MM.dd')}</div>
      </div>
    </div>
  );
};

export default ChatPostCard;
