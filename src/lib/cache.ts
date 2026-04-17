import type { Article, CacheEntry } from './types';

const TTL = 5 * 60 * 1000; // 5 minutes

function key(topic: string) {
  return `news_${topic}`;
}

export function getCached(topic: string): CacheEntry | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(key(topic));
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > TTL) {
      sessionStorage.removeItem(key(topic));
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

export function setCached(topic: string, articles: Article[], timestamp: number): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(key(topic), JSON.stringify({ articles, timestamp } satisfies CacheEntry));
  } catch {
    // storage full or unavailable
  }
}

export function clearCached(topic: string): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(key(topic));
  } catch {
    // ignore
  }
}
