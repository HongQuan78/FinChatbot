import React from 'react';
import { PiggyBank, GraduationCap, TrendingUp, Landmark } from 'lucide-react';
import { StarterQuestion } from '../types';

const STARTER_QUESTIONS: StarterQuestion[] = [
  { id: '1', text: 'What is the difference between a Traditional and Roth IRA?', icon: 'piggybank' },
  { id: '2', text: 'How does a 529 College Savings Plan work?', icon: 'graduation' },
  { id: '3', text: 'What are the benefits of a standard brokerage account?', icon: 'trending' },
  { id: '4', text: 'Can you explain what a High-Yield Savings Account is?', icon: 'landmark' },
];

interface StarterQuestionsProps {
  onSelect: (text: string) => void;
}

export const StarterQuestions: React.FC<StarterQuestionsProps> = ({ onSelect }) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'piggybank': return <PiggyBank size={18} className="text-blue-500 mb-2" />;
      case 'graduation': return <GraduationCap size={18} className="text-blue-500 mb-2" />;
      case 'trending': return <TrendingUp size={18} className="text-blue-500 mb-2" />;
      case 'landmark': return <Landmark size={18} className="text-blue-500 mb-2" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <h3 className="text-sm font-medium text-slate-500 mb-4 text-center uppercase tracking-wider">
        Suggested Topics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {STARTER_QUESTIONS.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.text)}
            className="flex flex-col items-start p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 text-left group"
          >
            {getIcon(q.icon)}
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
              {q.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
