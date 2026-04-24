export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface StarterQuestion {
  id: string;
  text: string;
  icon?: string;
}
