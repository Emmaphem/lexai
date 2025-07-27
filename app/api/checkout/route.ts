import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // ✅ Only create OpenAI client when this handler runs
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // your logic using `openai`
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: body.message }],
  });

  return NextResponse.json(response);
}
