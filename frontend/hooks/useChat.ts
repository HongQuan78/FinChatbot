import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage } from '../types';

const SYSTEM_INSTRUCTION = `
You are 'FinAssist', a professional, knowledgeable, and polite virtual assistant for a reputable financial services firm. 
Your primary role is to educate users about different types of investment accounts, such as:
- Individual and Joint Brokerage accounts
- Traditional IRAs
- Roth IRAs
- 401(k)s and 403(b)s
- 529 College Savings Plans
- High-Yield Savings Accounts (HYSA)
- Certificates of Deposit (CDs)

Guidelines:
1. Provide clear, concise, and accurate information.
2. Use formatting (bullet points, bold text) to make complex information easy to read.
3. DO NOT provide personalized financial advice.
4. DO NOT recommend specific stocks, bonds, mutual funds, or other specific assets.
5. If a user asks for personalized advice or specific recommendations, politely decline, explain your limitations as an AI, and suggest they speak with a licensed financial advisor.
6. Maintain a professional, trustworthy, objective, and reassuring tone.
7. Keep responses relatively brief unless the user asks for a detailed explanation.
`;

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // Initialize chat session
  useEffect(() => {
    const initChat = async () => {
      try {
        // Note: The API key is automatically injected by the hosting environment 
        // via process.env.API_KEY. It is already configured and ready to use.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2, // Lower temperature for more factual, consistent responses
          },
        });
      } catch (err) {
        console.error("Failed to initialize chat:", err);
        setError("Failed to connect to the assistant service.");
      }
    };

    initChat();
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!chatSessionRef.current || !text.trim()) return;

    const userMessageId = Date.now().toString();
    const modelMessageId = (Date.now() + 1).toString();

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, role: 'user', text },
      { id: modelMessageId, role: 'model', text: '', isStreaming: true }, // Placeholder for model response
    ]);
    
    setIsLoading(true);
    setError(null);

    try {
      const responseStream = await chatSessionRef.current.sendMessageStream({ message: text });
      
      let fullResponse = '';
      for await (const chunk of responseStream) {
        fullResponse += chunk.text;
        
        // Update the specific model message with new chunks
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === modelMessageId 
              ? { ...msg, text: fullResponse } 
              : msg
          )
        );
      }

      // Mark streaming as complete
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === modelMessageId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err.message || "An error occurred while communicating with the assistant.");
      // Remove the placeholder if it failed completely, or add an error message
      setMessages((prev) => {
        const filtered = prev.filter(msg => msg.id !== modelMessageId);
        return [...filtered, { id: Date.now().toString(), role: 'model', text: "I'm sorry, I encountered an error processing your request. Please try again." }];
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
};
