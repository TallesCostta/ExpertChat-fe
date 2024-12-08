import { Bot } from '../types';

const API_URL = 'https://low-demetra-donatti-21733ba9.koyeb.app/expertchat/gemini/enviar/prompt';

interface SendMessageRequest {
  prompt: string;
  categoria: string;
  especialidade: string;
}

export async function sendMessage(message: string, bot: Bot): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: message,
      categoria: bot.category,
      especialidade: bot.specialty,
    } as SendMessageRequest),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.text();
}