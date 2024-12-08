import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ConversationList } from '../components/ConversationList';
import { ChatMessages } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';
import { TypingIndicator } from '../components/TypingIndicator';
import { useBotStore } from '../store/useBotStore';
import { useConversationStore } from '../store/useConversationStore';
import { sendMessage } from '../services/api';
import { ArrowLeft } from 'lucide-react';

export function Chat() {
  const navigate = useNavigate();
  const { botId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const { bots } = useBotStore();
  const { conversations, addMessage } = useConversationStore();

  const bot = bots.find((b) => b.id === botId);
  const conversation = conversations.find((c) => c.botId === botId && !c.archived);

  if (!bot || !conversation) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    addMessage(conversation.id, {
      content: message,
      sender: 'user',
      timestamp: new Date(),
    });

    try {
      const response = await sendMessage(message, bot);
      addMessage(conversation.id, {
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage(conversation.id, {
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.',
        sender: 'bot',
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout 
      title={bot.name}
      showMobileMenu={showMobileMenu}
      onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
    >
      <div className="flex h-[calc(100vh-8rem)]">
        <div className={`${
          showMobileMenu ? 'block' : 'hidden'
        } md:block absolute md:relative w-80 z-10 h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-colors`}>
          <div className="p-4 border-b dark:border-gray-700">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar ao Dashboard</span>
            </button>
          </div>
          <ConversationList botId={botId} />
        </div>
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
          <div className="flex-1 overflow-y-auto p-4">
            <ChatMessages messages={conversation.messages} botName={bot.name} />
            {isLoading && <TypingIndicator botName={bot.name} />}
          </div>
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </Layout>
  );
}