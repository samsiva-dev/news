import type { Topic } from './types';

export const TOPICS: Topic[] = [
  { id: 'headlines',     label: 'Top Headlines', query: 'top news',          color: 'from-slate-500 to-slate-700',   icon: '📰' },
  { id: 'politics',      label: 'Politics',      query: 'politics',          color: 'from-red-500 to-red-700',       icon: '🏛️' },
  { id: 'sports',        label: 'Sports',        query: 'sports',            color: 'from-green-500 to-green-700',   icon: '⚽' },
  { id: 'technology',    label: 'Technology',    query: 'technology',        color: 'from-blue-500 to-blue-700',     icon: '💻' },
  { id: 'business',      label: 'Business',      query: 'business economy',  color: 'from-amber-500 to-amber-700',   icon: '💼' },
  { id: 'entertainment', label: 'Entertainment', query: 'entertainment',     color: 'from-purple-500 to-purple-700', icon: '🎬' },
  { id: 'health',        label: 'Health',        query: 'health medicine',   color: 'from-teal-500 to-teal-700',     icon: '🏥' },
  { id: 'science',       label: 'Science',       query: 'science research',  color: 'from-indigo-500 to-indigo-700', icon: '🔬' },
  { id: 'world',         label: 'World',         query: 'world news',        color: 'from-orange-500 to-orange-700', icon: '🌍' },
  { id: 'climate',       label: 'Climate',       query: 'climate environment', color: 'from-emerald-500 to-emerald-700', icon: '🌱' },
  { id: 'finance',       label: 'Finance',       query: 'finance stocks',    color: 'from-yellow-500 to-yellow-700', icon: '📈' },
  { id: 'education',     label: 'Education',     query: 'education schools', color: 'from-pink-500 to-pink-700',     icon: '📚' },
];

export const TOPIC_MAP = new Map(TOPICS.map(t => [t.id, t]));
