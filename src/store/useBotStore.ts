import { create } from 'zustand';
import { Bot } from '../types';

interface BotStore {
  bots: Bot[];
  addBot: (bot: Omit<Bot, 'id'>) => void;
  removeBot: (id: string) => void;
  updateBot: (id: string, updates: Partial<Bot>) => void;
}

export const useBotStore = create<BotStore>((set) => ({
  bots: [],
  addBot: (bot) =>
    set((state) => ({
      bots: [...state.bots, { ...bot, id: crypto.randomUUID() }],
    })),
  removeBot: (id) =>
    set((state) => ({
      bots: state.bots.filter((bot) => bot.id !== id),
    })),
  updateBot: (id, updates) =>
    set((state) => ({
      bots: state.bots.map((bot) =>
        bot.id === id ? { ...bot, ...updates } : bot
      ),
    })),
}));