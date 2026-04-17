export interface Article {
  id: string;
  title: string;
  url: string;
  description: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface CacheEntry {
  articles: Article[];
  timestamp: number;
}

export interface Topic {
  id: string;
  label: string;
  query: string;
  color: string;
  icon: string;
  region: 'IN' | 'GLOBAL';
}
