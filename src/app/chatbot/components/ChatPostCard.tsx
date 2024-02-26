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
      className="mt-2 inline-flex cursor-pointer justify-start gap-3 rounded-2xl bg-gray-200 p-2 pr-4 transition duration-300 hover:bg-gray-300"
      onClick={() => router.push(`/posts/${id}`)}
    >
      <Image
        src={coverImage}
        alt={title}
        className="size-14 rounded-2xl"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-start justify-center">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs font-semibold">{description}</div>
        <div className="text-xs">{format(createdAt, 'yyyy.MM.dd')}</div>
      </div>
    </div>
  );
};

export default ChatPostCard;
