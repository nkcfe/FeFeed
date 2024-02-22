import { createClient } from '@/libs/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources/index.mjs';

import prisma from '@/libs/prismadb';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getFirstMessage = async (): Promise<ChatCompletionSystemMessageParam> => {
  const result = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      tags: true,
    },
  });

  return {
    role: 'system',
    content: `너는 개발 전문 챗봇이야. 블로그 글을 참고해서 상대방의 질문에 답변해줘야해.
    블로그에 대해서 물어보면 다음 블로그 글 목록를 참고해서 답변해줘.
    
    [블로그 글 목록]
    ${JSON.stringify(result ?? [])}

    너는 retrieve 함수를 사용해서 글을 가져올 수 있어, 참고하고 싶은 블로그 글이 있으면 retrieve함수를 사용해서 글을 가져와서 답변해줘.
    `,
  };
};

const getBlogContent = async (id: string) => {
  const data = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!data) return {};
  return data;
};

type CompletionResponse = {
  messages: ChatCompletionMessageParam[];
};

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as CompletionResponse;

  if (messages.length === 1) {
    messages.unshift(await getFirstMessage());
  }

  while (messages.at(-1)?.role !== 'assistant') {
    const response = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
      function_call: 'auto',
      functions: [
        {
          name: 'retrieve',
          parameters: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: '가져올 블로그 글의 id',
              },
            },
          },
          description: '특정 id를 가진 블로그 글의 전체 내용을 가져온다.',
        },
      ],
    });

    const responseMessage = response.choices[0].message;

    if (responseMessage.function_call) {
      const { id } = JSON.parse(responseMessage.function_call.arguments);

      const functionResult = await getBlogContent(id);

      messages.push({
        role: 'function',
        content: JSON.stringify(functionResult),
        name: responseMessage.function_call.name,
      });
    } else {
      messages.push(responseMessage);
    }
  }

  return NextResponse.json(messages, { status: 200 });
}
