import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Building2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 
          ${isUser ? 'ml-3 bg-blue-600 text-white' : 'mr-3 bg-slate-800 text-white'}`}
        >
          {isUser ? <User size={18} /> : <Building2 size={18} />}
        </div>

        {/* Message Content */}
        <div className={`relative px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed
          ${isUser 
            ? 'bg-blue-600 text-white rounded-tr-sm' 
            : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.text}</div>
          ) : (
            <div className="markdown-body">
              {message.text ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                <div className="flex space-x-1 items-center h-5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
