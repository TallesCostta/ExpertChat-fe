import { Bot } from '../../types';

export interface SendMessageRequest {
  prompt: string;
  categoria: string;
  especialidade: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}