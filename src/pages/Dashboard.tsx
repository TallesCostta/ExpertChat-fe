import React from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '../components/Layout';
import { BotCard } from '../components/BotCard';
import { NewBotForm } from '../components/NewBotForm';
import { useBotStore } from '../store/useBotStore';

export function Dashboard() {
  const [showNewBotForm, setShowNewBotForm] = React.useState(false);
  const { bots } = useBotStore();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Meus Bots</h1>
          <button
            onClick={() => setShowNewBotForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Bot Especialista
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>

        {showNewBotForm && (
          <NewBotForm onClose={() => setShowNewBotForm(false)} />
        )}
      </div>
    </Layout>
  );
}