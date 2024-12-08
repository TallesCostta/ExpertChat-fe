import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ConversationList } from '../components/ConversationList';
import { ChatMessages } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';
import { useBotStore } from '../store/useBotStore';
import { useConversationStore } from '../store/useConversationStore';
import { sendMessage } from '../services/api';

export function Chat() {
  const { botId } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const { bots } = useBotStore();
  const { conversations, addMessage } = useConversationStore();

  const bot = bots.find((b) => b.id === botId);
  const conversation = conversations.find((c) => c.botId === botId);

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
      <div className="flex h-[calc(100vh-4rem)]">
        <div className={`${
          showMobileMenu ? 'block' : 'hidden'
        } md:block absolute md:relative w-80 z-10 h-full bg-white dark:bg-gray-800 transition-colors`}>
          <ConversationList />
        </div>
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
          <ChatMessages messages={conversation.messages} />
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </Layout>
  );
}