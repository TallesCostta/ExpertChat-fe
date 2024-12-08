import React from 'react';

export function TypingIndicator({ botName }: { botName: string }) {
  return (
    <div className="flex mb-4">
      <div className="max-w-[70%] bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{botName} está digitando...</span>
        </div>
      </div>
    </div>
  );
}