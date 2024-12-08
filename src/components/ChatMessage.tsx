import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  botName: string;
}

export function ChatMessage({ message, botName }: ChatMessageProps) {
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

  const senderName = message.sender === 'user' ? 'Você' : botName;

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
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({node, ...props}) => <p className="text-sm mb-2" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-400 hover:underline" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-md font-bold mb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2" {...props} />,
              code: ({node, inline, ...props}) => 
                inline ? (
                  <code className="bg-black/10 dark:bg-white/10 rounded px-1" {...props} />
                ) : (
                  <code className="block bg-black/10 dark:bg-white/10 rounded p-2 my-2 whitespace-pre-wrap" {...props} />
                ),
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-2" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {message.sender === 'user' ? (
            <User className="h-4 w-4 opacity-90" />
          ) : (
            <Bot className="h-4 w-4 opacity-90" />
          )}
          <span className="text-sm font-medium opacity-90">{senderName}</span>
          <span className="text-xs opacity-75">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}