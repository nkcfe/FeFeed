'use client';

import type { PostType } from '@/module/type';
import { format } from 'date-fns/format';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PostCardProps {
  post: PostType;
}

const PostCard = (props: PostCardProps) => {
  const { post } = props;
  const router = useRouter();

  return (
    <div
      className="group mt-10 flex cursor-pointer flex-col items-center justify-center md:w-[300px] lg:w-[400px]"
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <Image
        src={post.coverImage}
        alt="cover"
        width={600}
        height={250}
        className="inset-1 w-full rounded-3xl object-cover shadow-md transition duration-300 group-hover:translate-y-[-10px] group-hover:shadow-2xl md:h-[300px] lg:h-[400px]"
      />
      <div className="mt-6 flex w-full flex-col items-start gap-2 transition duration-300 group-hover:text-blue-600">
        <div className="rounded-xl bg-gray-600 px-2 py-0.5 text-xs text-white">
          {post.category}
        </div>
        <div className="font-semibold md:text-lg lg:text-2xl">{post.title}</div>
        <div className="text-gray-500 md:text-xs lg:text-sm">
          {format(new Date(post.createdAt), 'yyyy년 MM월 dd일')}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
