'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Rss } from 'lucide-react';
import { TopicSelector } from '@/components/TopicSelector';
import { NewsFeed } from '@/components/NewsFeed';
import { SearchTopicBar } from '@/components/SearchTopicBar';
import type { Topic } from '@/lib/types';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState('headlines');
  const [customTopics, setCustomTopics] = useState<Topic[]>([]);
  const [dark, setDark] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  function handleAddTopic(topic: Topic) {
    setCustomTopics(prev => {
      if (prev.some(t => t.id === topic.id)) return prev;
      return [...prev, topic];
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Rss size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">NewsCollector</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md hidden sm:block">
            <SearchTopicBar onAdd={handleAddTopic} onSearch={setSelectedTopic} />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Topics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
          <TopicSelector
            selected={selectedTopic}
            onSelect={setSelectedTopic}
            customTopics={customTopics}
          />
        </div>
      </header>

      {/* Mobile search */}
      <div className="sm:hidden px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <SearchTopicBar onAdd={handleAddTopic} onSearch={setSelectedTopic} />
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <NewsFeed topicId={selectedTopic} />
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 dark:text-gray-600 py-6 border-t border-gray-100 dark:border-gray-800">
        Powered by Google News RSS · Results cached for 5 minutes per session
      </footer>
    </div>
  );
}
