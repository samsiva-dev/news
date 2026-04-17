import type { Article } from './types';

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(parseInt(code, 10)));
}

function stripCdata(str: string): string {
  return str.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
}

function extractTagContent(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  if (!match) return '';
  return decodeEntities(stripCdata(match[1]).trim());
}

function extractTagAttribute(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i');
  const match = xml.match(regex);
  return match ? match[1] : '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractImageFromHtml(html: string): string | undefined {
  const match = html.match(/src="(https?:\/\/[^"]+\.(?:jpg|jpeg|png|gif|webp)[^"]*?)"/i);
  return match ? match[1] : undefined;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function parseRSS(xml: string): Article[] {
  const itemMatches = xml.match(/<item[^>]*>([\s\S]*?)<\/item>/gi) || [];
  const articles: Article[] = [];

  itemMatches.forEach((item, idx) => {
    const title = stripHtml(extractTagContent(item, 'title'));
    if (!title) return;

    let url = '';
    const linkMatch =
      item.match(/<link>([^<]+)<\/link>/i) ||
      item.match(/<link\s+href="([^"]+)"/i) ||
      item.match(/<guid[^>]*>([^<]+)<\/guid>/i);
    if (linkMatch) url = linkMatch[1].trim();
    if (!url) return;

    const description = extractTagContent(item, 'description');
    const pubDate = extractTagContent(item, 'pubDate');
    const sourceName = stripHtml(extractTagContent(item, 'source'));
    const sourceUrl = extractTagAttribute(item, 'source', 'url');

    const imageUrl =
      extractImageFromHtml(description) ||
      extractTagAttribute(item, 'media:thumbnail', 'url') ||
      extractTagAttribute(item, 'media:content', 'url') ||
      extractTagAttribute(item, 'enclosure', 'url') ||
      undefined;

    articles.push({
      id: `${idx}-${pubDate || Date.now()}`,
      title,
      url,
      description: stripHtml(description).slice(0, 280),
      source: sourceName || extractDomain(sourceUrl || url) || 'Unknown',
      sourceUrl: sourceUrl || extractDomain(url),
      publishedAt: pubDate,
      imageUrl,
    });
  });

  return articles;
}
