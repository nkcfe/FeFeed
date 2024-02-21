import { cn } from '@/utils/style';
import React from 'react';
import { TfiFaceSmile } from 'react-icons/tfi';
import { GoHubot } from 'react-icons/go';

export type MessageProps = {
  content: string;
  role: 'user' | 'assistant';
};

const Message = (props: MessageProps) => {
  const { content, role } = props;
  return (
    <div className="">
      <div
        className={cn(
          'container mx-auto flex items-start gap-1 rounded-3xl px-3 py-2 lg:gap-4',
          role === 'assistant' ? 'bg-[#F0FAF9]' : 'bg-gray-100',
        )}
      >
        {role === 'user' ? (
          <>
            <div className="rounded-full bg-gray-800 p-2">
              <TfiFaceSmile className="size-5 text-white" />
            </div>
          </>
        ) : (
          <>
            <div className="rounded-full bg-green-200 p-2">
              <GoHubot className="size-5 text-green-700" />
            </div>
          </>
        )}
        <div className={'flex flex-col items-start py-2'}>
          <div className={'whitespace-pre-wrap text-sm text-gray-600'}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
