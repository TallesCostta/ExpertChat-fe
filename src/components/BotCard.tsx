import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot as BotIcon, Trash2, Edit } from 'lucide-react';
import { Bot } from '../types';
import { useBotStore } from '../store/useBotStore';
import { useConversationStore } from '../store/useConversationStore';

interface BotCardProps {
  bot: Bot;
}

export function BotCard({ bot }: BotCardProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(bot.name);
  const { removeBot, updateBot } = useBotStore();
  const { addConversation, conversations } = useConversationStore();

  const handleStartChat = () => {
    const existingConversation = conversations.find(
      (conv) => conv.botId === bot.id && !conv.archived
    );

    if (existingConversation) {
      navigate(`/chat/${bot.id}`);
    } else {
      const conversationId = addConversation(bot.id);
      navigate(`/chat/${bot.id}`);
    }
  };

  const handleSave = () => {
    updateBot(bot.id, { name });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <BotIcon className="h-8 w-8 text-blue-600" />
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleSave}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              autoFocus
            />
          ) : (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{bot.name}</h3>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => removeBot(bot.id)}
            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Categoria: {bot.category}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Especialidade: {bot.specialty}</p>
      </div>
      <button
        onClick={handleStartChat}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Iniciar Chat
      </button>
    </div>
  );
}