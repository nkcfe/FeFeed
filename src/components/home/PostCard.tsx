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
      className="group mt-10 flex cursor-pointer flex-col items-center justify-center"
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <div className="relative h-[250px] w-[350px] overflow-hidden rounded-xl">
        <Image
          src={post.coverImage}
          alt="cover"
          fill
          className="object-cover shadow-inner transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-6 flex w-full flex-col items-start gap-2 transition duration-300 group-hover:text-blue-600">
        <div className="rounded-xl bg-gray-600 px-2 py-0.5 text-xs text-white">
          {post.category}
        </div>
        <div className="font-semibold md:text-lg lg:text-lg">{post.title}</div>
        <div className="text-gray-500 md:text-xs lg:text-sm">
          {format(new Date(post.createdAt), 'yyyy년 MM월 dd일')}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
