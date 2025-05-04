import { XMLParser } from "fast-xml-parser";
import type { NoteArticle } from "./interfaces";

const NOTE_RSS_URL = "https://note.com/satoooh/rss";
// キャッシュ時間を設定（ミリ秒）
const CACHE_TIME = 3600000; // 1時間

// キャッシュ変数
let cachedArticles: NoteArticle[] | null = null;
let lastFetchTime = 0;

/**
 * noteブログの記事を取得する関数
 *
 * @returns {Promise<NoteArticle[]>} 記事の配列
 */
export async function getNoteArticles(): Promise<NoteArticle[]> {
	const now = Date.now();

	// キャッシュが有効ならそれを使用
	if (cachedArticles && now - lastFetchTime < CACHE_TIME) {
		return cachedArticles;
	}

	try {
		const response = await fetch(NOTE_RSS_URL);
		if (!response.ok) {
			throw new Error(`Failed to fetch RSS: ${response.status}`);
		}

		const xml = await response.text();
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "@_",
		});

		const result = parser.parse(xml);
		const items = result.rss.channel.item || [];

		cachedArticles = items.map((item: any) => ({
			title: item.title,
			link: item.link,
			pubDate: new Date(item.pubDate).toISOString(),
			// サムネイル画像があれば取得、なければundefined
			thumbnail: item["media:thumbnail"]?.["@_url"] || item.enclosure?.["@_url"] || undefined,
			description: item.description
				? item.description.replace(/<[^>]*>/g, "") // HTMLタグを削除
				: undefined,
		}));

		lastFetchTime = now;
		return cachedArticles || [];
	} catch (error) {
		console.error("Error fetching note RSS:", error);
		// エラー時は空配列か前回のキャッシュを返す
		return cachedArticles || [];
	}
}
