import { cn } from '@/utils/style';
import React from 'react';
import { TfiFaceSmile } from 'react-icons/tfi';
import { GoHubot } from 'react-icons/go';
import type { PostType } from '@/module/type';
import ChatPostCard from './ChatPostCard';

export type MessageProps = {
  content: string;
  role: 'user' | 'assistant';
  posts?: PostType[];
};

const Message = (props: MessageProps) => {
  const { content, role, posts } = props;

  return (
    <div
      className={cn(
        'mx-auto flex w-full items-start',
        role === 'user' ? 'justify-end' : 'justify-start',
      )}
      data-cy="message"
    >
      {role === 'user' ? (
        <div className="rounded-xl bg-purple-400 p-2 px-4">
          <div className={'whitespace-pre-wrap text-sm text-white'}>
            {content}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center justify-start gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-yellow-200 p-1">
              <GoHubot className="" />
            </div>
            <div className="text-sm font-semibold dark:text-white">
              Chat Bot
            </div>
          </div>
          <div className="flex flex-col items-start py-2 ">
            <div className="max-w-sm whitespace-pre-wrap  rounded-xl bg-gray-100 p-4 text-sm text-gray-600 dark:bg-neutral-800 dark:text-gray-200 sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              {content}
              {posts && posts.length > 0 && (
                <div>
                  {posts.map((post) => (
                    <ChatPostCard key={post.id} {...post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
