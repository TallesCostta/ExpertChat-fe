import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  botName: string;
}

export function ChatMessages({ messages, botName }: ChatMessagesProps) {
  const messageEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} botName={botName} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
}