import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Archive, Edit2, Trash2 } from 'lucide-react';
import { useConversationStore } from '../store/useConversationStore';

export function ConversationList() {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    removeConversation,
    updateConversationTitle,
    archiveConversation,
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

  return (
    <div className="w-80 bg-gray-50 border-r overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversas</h2>
        <div className="space-y-2">
          {conversations
            .filter((conv) => !conv.archived)
            .map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  activeConversationId === conversation.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-100'
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
                      className="border rounded px-2 py-1 text-sm"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-sm font-medium text-gray-900">
                      {conversation.title}
                    </h3>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(conversation.id, conversation.title);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        archiveConversation(conversation.id);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeConversation(conversation.id);
                      }}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {format(conversation.createdAt, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}