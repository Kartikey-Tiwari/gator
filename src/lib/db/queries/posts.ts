import { desc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { feed_follows, posts } from "../schema.js";

export async function createPost(
  title: string,
  url: string,
  description: string,
  publishedAt: Date | undefined,
  feedId: string,
) {
  const [result] = await db
    .insert(posts)
    .values({
      title,
      url,
      description,
      ...(publishedAt ? { publishedAt } : {}),
      feedId,
    })
    .returning();

  return result;
}

export async function getPostByURL(url: string) {
  const [result] = await db.select().from(posts).where(eq(posts.url, url));
  return result;
}

export async function getPostsForUser(userId: string, limit: number) {
  const result = await db
    .select({
      title: posts.title,
      url: posts.url,
      description: posts.description,
      publishedAt: posts.publishedAt,
    })
    .from(posts)
    .innerJoin(feed_follows, eq(feed_follows.feedId, posts.feedId))
    .where(eq(feed_follows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);

  return result;
}
