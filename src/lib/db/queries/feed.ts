import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { feeds, users } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, userId })
    .returning();
  return result;
}

export async function getFeeds() {
  return db
    .select({ name: feeds.name, url: feeds.url, username: users.name })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeedByURL(url: string) {
  const [feed] = await db.select().from(feeds).where(eq(feeds.url, url));
  return feed;
}

export async function resetFeeds() {
  return db.delete(feeds);
}
