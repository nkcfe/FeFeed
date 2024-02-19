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
      className="group flex w-[550px] cursor-pointer flex-col items-center justify-center"
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <Image
        src={post.coverImage}
        alt="cover"
        width={600}
        height={250}
        className="inset-1 h-[300px] w-full rounded-xl object-cover transition duration-300 group-hover:translate-y-[-10px] group-hover:shadow-2xl"
      />
      <div className="mt-8 flex w-full flex-col items-start gap-3 transition duration-300 group-hover:text-blue-600">
        <div className="text-sm text-gray-500">{post.category}</div>
        <div className="text-3xl font-semibold">{post.title}</div>
        <div className="text-sm text-gray-500">{post.description}</div>
        <div className="text-sm text-gray-500">
          {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
