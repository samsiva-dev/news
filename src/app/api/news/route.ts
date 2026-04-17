import { NextRequest, NextResponse } from 'next/server';
import { parseRSS } from '@/lib/rss';
import { TOPICS } from '@/lib/topics';

function buildRssUrl(topicId: string): string {
  const topic = TOPICS.find(t => t.id === topicId);
  const query = topic ? topic.query : topicId;
  const locale = topic?.region === 'IN'
    ? 'hl=en-IN&gl=IN&ceid=IN:en'
    : 'hl=en-US&gl=US&ceid=US:en';
  return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&${locale}`;
}

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic') || 'headlines';

  const rssUrl = buildRssUrl(topic);

  try {
    const res = await fetch(rssUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsCollector/1.0)' },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`RSS responded with ${res.status}`);
    }

    const xml = await res.text();
    const articles = parseRSS(xml);

    return NextResponse.json({ articles, timestamp: Date.now() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message, articles: [] }, { status: 500 });
  }
}
