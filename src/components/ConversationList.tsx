import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Archive, Edit2, Trash2, MessageSquarePlus } from 'lucide-react';
import { useConversationStore } from '../store/useConversationStore';

interface ConversationListProps {
  botId: string;
}

export function ConversationList({ botId }: ConversationListProps) {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    removeConversation,
    updateConversationTitle,
    archiveConversation,
    addConversation,
  } = useConversationStore();

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState('');

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleSave = () => {
    if (editingId) {
      updateConversationTitle(editingId, editingTitle);
      setEditingId(null);
    }
  };

  const handleNewConversation = () => {
    addConversation(botId);
  };

  const botConversations = conversations.filter(
    (conv) => !conv.archived && conv.botId === botId
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b dark:border-gray-700">
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          <MessageSquarePlus className="h-4 w-4" />
          <span>Nova Conversa</span>
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Conversas
          </h2>
          <div className="space-y-2">
            {botConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  activeConversationId === conversation.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex justify-between items-start">
                  {editingId === conversation.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={handleSave}
                      onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                      className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {conversation.title}
                    </h3>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(conversation.id, conversation.title);
                      }}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        archiveConversation(conversation.id);
                      }}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeConversation(conversation.id);
                      }}
                      className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {format(conversation.createdAt, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}