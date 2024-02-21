import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type CompletionResponse = {
  messages: ChatCompletionMessageParam[];
};

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as CompletionResponse;

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: '너는 남궁철의 블로그를 위한 챗봇이야. 친근한 가이드가 되어줘',
      },
      ...messages,
    ],
    model: 'gpt-3.5-turbo',
  });

  messages.push(response.choices[0].message);

  return NextResponse.json(messages, { status: 200 });
}
