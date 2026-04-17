'use client';

import { RefreshCw, AlertCircle, Newspaper } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { useNews } from '@/hooks/useNews';
import { TOPIC_MAP } from '@/lib/topics';

interface Props {
  topicId: string;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 animate-pulse px-5 py-4 flex flex-col gap-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
    </div>
  );
}

function formatTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diff < 1) return 'just now';
  if (diff < 60) return `${diff} min ago`;
  return `${Math.floor(diff / 60)}h ago`;
}

export function NewsFeed({ topicId }: Props) {
  const { articles, loading, error, lastUpdated, refresh } = useNews(topicId);
  const topic = TOPIC_MAP.get(topicId);
  const topicColor = topic?.color ?? 'from-slate-500 to-slate-700';
  const topicIcon = topic?.icon ?? '📰';

  return (
    <div>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-5 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span>
            {loading
              ? 'Fetching latest news…'
              : error
              ? 'Could not load news'
              : `${articles.length} articles${lastUpdated ? ` · updated ${formatTime(lastUpdated)}` : ''}`}
          </span>
          {topic && (
            <span
              title={topic.region === 'IN' ? 'India' : 'Global'}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {topic.region === 'IN' ? '🇮🇳 India' : '🌐 Global'}
            </span>
          )}
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500 dark:text-gray-400">
          <AlertCircle size={40} className="text-red-400" />
          <p className="text-sm font-medium">{error}</p>
          <button
            onClick={refresh}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Articles grid */}
      {!loading && !error && articles.length > 0 && (
        <div className="flex flex-col gap-3">
          {articles.map(article => (
            <NewsCard
              key={article.id}
              article={article}
              topicColor={topicColor}
              topicIcon={topicIcon}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && articles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500 dark:text-gray-400">
          <Newspaper size={40} className="opacity-40" />
          <p className="text-sm">No articles found for this topic.</p>
          <button
            onClick={refresh}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try refreshing
          </button>
        </div>
      )}
    </div>
  );
}
