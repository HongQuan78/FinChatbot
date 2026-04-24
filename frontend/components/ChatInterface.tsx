import React, { useState, useRef, useEffect } from 'react';
import { Send, ShieldAlert, RefreshCw } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { StarterQuestions } from './StarterQuestions';

export const ChatInterface: React.FC = () => {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStarterSelect = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto bg-slate-50 shadow-2xl overflow-hidden md:rounded-t-2xl border-x border-t border-slate-200">
      
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 z-10 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldAlert size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg tracking-tight">FinAssist</h1>
            <p className="text-xs text-slate-400 font-medium">Investment Account Guide</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">AI Online</span>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center animate-in fade-in duration-700">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <ShieldAlert size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Welcome to FinAssist</h2>
            <p className="text-slate-500 text-center max-w-md mb-8 leading-relaxed">
              I'm here to help you understand different types of investment accounts. Ask me anything about IRAs, Brokerage accounts, 529s, and more.
            </p>
            <StarterQuestions onSelect={handleStarterSelect} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {error && (
              <div className="flex items-center justify-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
                <ShieldAlert size={16} className="mr-2" />
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <div className="relative flex-1 bg-slate-50 rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about investment accounts..."
                className="w-full max-h-32 min-h-[56px] bg-transparent border-0 focus:ring-0 resize-none py-4 pl-4 pr-12 text-slate-700 placeholder:text-slate-400"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="h-[56px] w-[56px] flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm shrink-0"
              aria-label="Send message"
            >
              {isLoading ? (
                <RefreshCw size={20} className="animate-spin" />
              ) : (
                <Send size={20} className="ml-1" />
              )}
            </button>
          </form>
          
          {/* Disclaimer */}
          <div className="mt-3 text-center">
            <p className="text-[11px] text-slate-400">
              FinAssist is an AI educational tool, not a licensed financial advisor. Information provided is for educational purposes only and does not constitute financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
