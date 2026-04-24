import React from 'react';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col bg-slate-200/50">
      {/* Optional: A subtle background pattern or gradient could go here */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      <main className="flex-1 h-full w-full pt-0 md:pt-8 pb-0 md:pb-8 px-0 md:px-4 relative z-10">
        <ChatInterface />
      </main>
    </div>
  );
};

export default App;
