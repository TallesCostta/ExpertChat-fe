import React from 'react';
import { Link } from 'react-router-dom';
import { Bot as BotIcon, Trash2, Edit } from 'lucide-react';
import { Bot } from '../types';
import { useBotStore } from '../store/useBotStore';
import { useConversationStore } from '../store/useConversationStore';

interface BotCardProps {
  bot: Bot;
}

export function BotCard({ bot }: BotCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(bot.name);
  const { removeBot, updateBot } = useBotStore();
  const { addConversation } = useConversationStore();

  const handleStartChat = () => {
    addConversation(bot.id);
  };

  const handleSave = () => {
    updateBot(bot.id, { name });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
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
              className="border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <h3 className="text-lg font-medium text-gray-900">{bot.name}</h3>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => removeBot(bot.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Categoria: {bot.category}</p>
        <p className="text-sm text-gray-500">Especialidade: {bot.specialty}</p>
      </div>
      <Link
        to={`/chat/${bot.id}`}
        onClick={handleStartChat}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Iniciar Chat
      </Link>
    </div>
  );
}