'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TOPICS } from '@/lib/topics';
import type { Topic } from '@/lib/types';

interface Props {
  selected: string;
  onSelect: (topicId: string) => void;
  customTopics?: Topic[];
}

export function TopicSelector({ selected, onSelect, customTopics = [] }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const allTopics = [...TOPICS, ...customTopics];

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  }

  return (
    <div className="relative flex items-center gap-1">
      <button
        onClick={() => scroll('left')}
        className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1 py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allTopics.map(topic => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selected === topic.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{topic.icon}</span>
            <span>{topic.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
