export interface Bot {
  id: string;
  name: string;
  category: string;
  specialty: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  botId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  archived: boolean;
}