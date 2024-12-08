import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isOlderThan24Hours = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return diff > 24 * 60 * 60 * 1000;
  };

  const formatMessageTime = (date: Date) => {
    if (isOlderThan24Hours(date)) {
      return format(date, "d 'de' MMMM 'às' HH:mm", { locale: ptBR });
    }
    return format(date, 'HH:mm');
  };

  return (
    <div
      className={`flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          message.sender === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-75 mt-1 block">
          {formatMessageTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}