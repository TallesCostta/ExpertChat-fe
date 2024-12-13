import { Bot } from '../../types';
import { SendMessageRequest } from './types';
import { apiClient } from './client';
import { API_CONFIG } from './config';

export async function sendMessage(message: string, bot: Bot): Promise<string> {
  const request: SendMessageRequest = {
    prompt: message,
    categoria: bot.category,
    especialidade: bot.specialty,
  };

  const response = await apiClient(API_CONFIG.ENDPOINTS.SEND_MESSAGE, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return response.text();
}