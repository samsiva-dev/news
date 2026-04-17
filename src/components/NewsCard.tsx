'use client';

import { useState } from 'react';
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

export function NewsCard({ article, topicColor, topicIcon }: Props) {
  const [imgError, setImgError] = useState(false);
  const showImage = article.imageUrl && !imgError;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Image / Gradient fallback */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${topicColor} flex items-center justify-center`}>
            <span className="text-5xl opacity-70">{topicIcon}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
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
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed flex-1">
            {article.description}
          </p>
        )}

        {/* Read more */}
        <div className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 mt-auto pt-1">
          <span>Read more</span>
          <ExternalLink size={11} />
        </div>
      </div>
    </a>
  );
}
