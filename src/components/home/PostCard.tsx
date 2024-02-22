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
      className="group mt-10 flex w-[350px] cursor-pointer flex-col items-center justify-center"
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <Image
        src={post.coverImage}
        alt="cover"
        width={600}
        height={250}
        className="inset-1 h-[200px] w-full rounded-xl object-cover shadow-md transition duration-300 group-hover:translate-y-[-10px] group-hover:shadow-2xl"
      />
      <div className="mt-6 flex w-full flex-col items-start gap-2 transition duration-300 group-hover:text-blue-600">
        <div className="rounded-md bg-gray-100 px-1 py-0.5 text-sm text-gray-600">
          {post.category}
        </div>
        <div className="text-2xl font-semibold">{post.title}</div>
        <div className="text-sm text-gray-600">{post.description}</div>
        <div className="text-sm text-gray-400">
          {format(new Date(post.createdAt), 'yyyy.MM.dd')}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
