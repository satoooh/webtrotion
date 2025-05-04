import { AtpAgent } from "@atproto/api";
import type { AppBskyFeedDefs } from "@atproto/api";
import { SOCIALS } from "@/constants";

// キャッシュ変数
let cachedPosts: AppBskyFeedDefs.PostView[] | null = null;
let lastFetchTime = 0;

// キャッシュ時間を設定（ミリ秒）
const CACHE_TIME = 3600000; // 1時間

/**
 * 指定したBlueskyアカウントの投稿を取得する
 *
 * @param {number} limit - 取得する投稿数（デフォルト5件）
 * @returns {Promise<AppBskyFeedDefs.PostView[]>} 投稿の配列
 */
export async function getBlueskyPosts(limit: number = 5): Promise<AppBskyFeedDefs.PostView[]> {
	// 設定からBlueskyのハンドルを取得
	const blueskyUrl = SOCIALS.bluesky || "";
	if (!blueskyUrl) {
		console.warn("Bluesky URL not configured in constants-config.json");
		return [];
	}

	// URLからハンドルを抽出
	const match = blueskyUrl.match(/profile\/([^/]+)/);
	const handle = match?.[1] || "";

	if (!handle) {
		console.warn("Could not extract Bluesky handle from URL:", blueskyUrl);
		return [];
	}

	const now = Date.now();

	// キャッシュが有効ならそれを使用
	if (cachedPosts && now - lastFetchTime < CACHE_TIME) {
		return cachedPosts.slice(0, limit);
	}

	try {
		// Bluesky APIクライアントを初期化
		const agent = new AtpAgent({
			service: "https://public.api.bsky.app",
		});

		// ハンドルからDIDを解決
		const handleResolution = await agent.resolveHandle({ handle });
		const did = handleResolution.data.did;

		if (!did) {
			throw new Error(`Could not resolve handle: ${handle}`);
		}

		// アカウントの投稿を取得
		const authorFeed = await agent.getAuthorFeed({ actor: did, limit: 10 });

		// 投稿を取得（返信を除外）
		cachedPosts = authorFeed.data.feed
			.filter((item) => item.post && !item.reply)
			.map((item) => item.post);

		lastFetchTime = now;
		return cachedPosts.slice(0, limit);
	} catch (error) {
		console.error("Error fetching Bluesky posts:", error);
		return cachedPosts || [];
	}
}
