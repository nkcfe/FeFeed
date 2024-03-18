'use client';

import IconButton from '@/components/share/IconButton';
import React, {
  FormEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { TbHttpDelete } from 'react-icons/tb';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Message, { MessageProps } from '@/components/chatbot/Message';
import Input from '@/components/share/Input';
import ChatBlank from '@/components/chatbot/ChatBlank';
import Typing from '@/components/chatbot/Typing';
import { toast } from 'react-toastify';
import { PostType } from '@/module/type';
import Header from './Header';

const ChatPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >(() => {
    if (typeof window !== 'undefined') {
      const existingMessages = localStorage.getItem('messages');
      if (!existingMessages) return [];
      return JSON.parse(existingMessages);
    }
  });

  const { mutate, isPending } = useMutation<
    ChatCompletionMessageParam[],
    unknown,
    ChatCompletionMessageParam[]
  >({
    mutationFn: async (messages) => {
      const res = await axios.post('/api/completions', {
        messages,
      });
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      setMessageParams(data);
      localStorage.setItem('messages', JSON.stringify(data));
    },
  });

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (!inputRef.current?.value) {
        toast.error('검색어를 입력해주세요');
      }
      if (isPending) return;
      const nextMessages = [
        ...messageParams,
        {
          content: inputRef.current?.value ?? ('' as string),
          role: 'user' as const,
        },
      ];

      setMessageParams(nextMessages);
      mutate(nextMessages);
      inputRef.current!.value = '';
    },

    [isPending, messageParams, mutate],
  );

  const handleReset = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setMessageParams([]);
    localStorage.removeItem('messages');
  };

  const messagePropsList = useMemo(() => {
    if (!Array.isArray(messageParams)) {
      return [];
    }

    let posts: PostType[] = [];

    const result = messageParams.reduce<MessageProps[]>((acc, cur) => {
      if (cur.role === 'function' && cur.content) {
        posts.push(JSON.parse(cur.content) as PostType);
      }
      if (cur.role === 'user') {
        posts = [];
        return [...acc, cur as MessageProps];
      }

      if (cur.role === 'assistant') {
        const result = [...acc, { ...cur, posts: [...posts] } as MessageProps];
        posts = [];
        return result;
      }
      return acc;
    }, []);

    return result;
  }, [messageParams]);

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-7.5rem)] overflow-scroll">
        <div className=" mx-auto max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          {messagePropsList.length === 0 ? (
            <div className="flex h-[calc(100vh-7.5rem)] justify-center">
              <ChatBlank />
            </div>
          ) : (
            <div className="mt-24 flex flex-1 flex-col items-start justify-start gap-4">
              {messagePropsList.map((props, index) => (
                <Message key={index} {...props} />
              ))}
              {isPending && <Typing />}
            </div>
          )}
        </div>

        <div className="fixed bottom-10 left-[50%] w-full max-w-sm -translate-x-1/2 sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center rounded-2xl border-gray-500 bg-gray-100 dark:bg-neutral-700"
          >
            <Input
              ref={inputRef}
              type="text"
              className="mx-1 flex-1 bg-transparent p-4 text-sm text-gray-600 dark:text-gray-100"
              placeholder="무엇이든 물어보세요!"
            />
            <IconButton
              Icon={RiSendPlaneFill}
              type="submit"
              label="search"
              className="m-1 rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-700"
            />
            <IconButton
              Icon={TbHttpDelete}
              onClick={(e) => handleReset(e)}
              type="reset"
              label="search"
              className="m-1 rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-700"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
