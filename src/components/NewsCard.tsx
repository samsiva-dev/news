'use client';

import { ExternalLink, Clock } from 'lucide-react';
import type { Article } from '@/lib/types';

interface Props {
  article: Article;
  topicColor: string;
  topicIcon: string;
}

function relativeTime(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  } catch {
    return '';
  }
}

export function NewsCard({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col py-4 px-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 gap-1.5"
    >
      {/* Source + time */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-gray-700 dark:text-gray-300 truncate">{article.source}</span>
        {article.publishedAt && (
          <>
            <span>·</span>
            <Clock size={11} className="flex-shrink-0" />
            <span className="flex-shrink-0">{relativeTime(article.publishedAt)}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {article.title}
      </h2>

      {/* Description */}
      {article.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {article.description}
        </p>
      )}

      {/* Read more */}
      <div className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 pt-0.5">
        <span>Read more</span>
        <ExternalLink size={11} />
      </div>
    </a>
  );
}
