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
      className="group mt-10 flex h-[400px] w-full cursor-pointer flex-col"
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <div className="h-60 w-full overflow-hidden ">
        <Image
          src={post.coverImage}
          alt={post.title}
          priority
          width={300}
          height={200}
          className="m-0 h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex items-center justify-between p-2">
        <div className="inline-block text-sm font-semibold text-orange-500">
          {post.category}
        </div>
        <div className="text-xs text-gray-400">
          {format(new Date(post.createdAt), 'yyyy. MM. dd')}
        </div>
      </div>

      <div className="h-8 truncate p-2 font-semibold">{post.title}</div>

      <div className="h-8 truncate p-2 text-sm text-gray-600">
        {post.description}
      </div>

      <div className="mt-auto flex w-full gap-1 truncate p-2">
        {post.tags.map((tag, idx) => (
          <div
            key={`${tag}-${idx}`}
            className="rounded bg-slate-100 p-1 px-2 text-xs dark:bg-stone-500"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
