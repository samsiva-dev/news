'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Article } from '@/lib/types';
import { getCached, setCached, clearCached } from '@/lib/cache';

interface UseNewsResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

export function useNews(topic: string): UseNewsResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [bust, setBust] = useState(0);

  const refresh = useCallback(() => {
    clearCached(topic);
    setBust(v => v + 1);
  }, [topic]);

  useEffect(() => {
    if (!topic) return;

    const cached = getCached(topic);
    if (cached) {
      setArticles(cached.articles);
      setLastUpdated(new Date(cached.timestamp));
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/news?topic=${encodeURIComponent(topic)}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        if (data.error) throw new Error(data.error);
        setArticles(data.articles);
        setLastUpdated(new Date(data.timestamp));
        setCached(topic, data.articles, data.timestamp);
      })
      .catch(err => {
        if (!cancelled) setError(err.message || 'Failed to fetch news');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [topic, bust]);

  return { articles, loading, error, lastUpdated, refresh };
}
