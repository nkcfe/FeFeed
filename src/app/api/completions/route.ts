import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ChatCompletionMessage,
} from 'openai/resources/index.mjs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type CompletionResponse = {
  messages: ChatCompletionMessage[];
};

export async function GET(req: NextRequest) {
  const messages: ChatCompletionMessage[] = [];

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  messages.push(response.choices[0].message);

  return NextResponse.json({ messages, status: 200 });
}
