import { create } from 'zustand';
import { Conversation, Message } from '../types';

interface ConversationStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  addConversation: (botId: string) => void;
  removeConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<Message, 'id'>) => void;
  setActiveConversation: (id: string | null) => void;
  updateConversationTitle: (id: string, title: string) => void;
  archiveConversation: (id: string) => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: [],
  activeConversationId: null,
  addConversation: (botId) =>
    set((state) => ({
      conversations: [
        ...state.conversations,
        {
          id: crypto.randomUUID(),
          botId,
          title: 'Nova conversa',
          messages: [],
          createdAt: new Date(),
          archived: false,
        },
      ],
    })),
  removeConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((conv) => conv.id !== id),
    })),
  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, { ...message, id: crypto.randomUUID() }],
            }
          : conv
      ),
    })),
  setActiveConversation: (id) =>
    set(() => ({
      activeConversationId: id,
    })),
  updateConversationTitle: (id, title) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === id ? { ...conv, title } : conv
      ),
    })),
  archiveConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === id ? { ...conv, archived: true } : conv
      ),
    })),
}));