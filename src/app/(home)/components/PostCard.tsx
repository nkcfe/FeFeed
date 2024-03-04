'use client';

import type { PostType } from '@/module/type';
import { cn } from '@/utils/style';
import { format } from 'date-fns/format';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Variants, motion } from 'framer-motion';

interface PostCardProps {
  post: PostType;
}

const PostCard = (props: PostCardProps) => {
  const { post } = props;
  const router = useRouter();

  const cardVariants: Variants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 50,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.9,
      },
    },
  };

  return (
    <motion.div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        'group flex cursor-pointer flex-col items-center justify-center',
      )}
      data-cy="post-card"
      onClick={() => router.push(`/posts/${post.id}`)}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.9 }}
    >
      <motion.div variants={cardVariants}>
        <div className="relative h-[200px] w-[300px] overflow-hidden rounded-xl lg:h-[250px] lg:w-[350px]">
          <Image
            src={post.coverImage}
            alt="cover"
            fill
            priority
            sizes="(max-width: 300px) 100vw, 300px"
            className="object-cover shadow-inner transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-6 flex w-full flex-col items-start gap-2 transition duration-300 group-hover:text-blue-600 dark:text-white">
          <div className="rounded-2xl bg-gray-600 px-2 py-0.5 text-xs font-bold text-white">
            {post.category}
          </div>
          <div className="font-semibold md:text-lg lg:text-lg">
            {post.title}
          </div>
          <div className="text-gray-500 md:text-xs lg:text-sm">
            {format(new Date(post.createdAt), 'yyyy년 MM월 dd일')}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostCard;
