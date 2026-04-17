'use client';

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import type { Topic } from '@/lib/types';

interface Props {
  onAdd: (topic: Topic) => void;
  onSearch: (query: string) => void;
}

export function SearchTopicBar({ onAdd, onSearch }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    const id = `custom_${trimmed.toLowerCase().replace(/\s+/g, '_')}`;
    onAdd({
      id,
      label: trimmed.charAt(0).toUpperCase() + trimmed.slice(1),
      query: trimmed,
      color: 'from-cyan-500 to-cyan-700',
      icon: '🔍',
      region: 'GLOBAL',
    });
    onSearch(id);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search any topic…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 border border-transparent focus:border-blue-400 focus:outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={!value.trim()}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={14} />
        Add
      </button>
    </form>
  );
}
