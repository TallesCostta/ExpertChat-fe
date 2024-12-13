import React from 'react';
import { Bot } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-pulse">
        <Bot className="h-16 w-16 text-blue-600 animate-[scale_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}