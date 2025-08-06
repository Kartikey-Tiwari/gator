import { and, eq } from "drizzle-orm";
import { db } from "../index.js";
import { feed_follows, feeds, users } from "../schema.js";

export async function createFeedFollow(feedId: string, userId: string) {
  const [row] = await db
    .insert(feed_follows)
    .values({
      feedId,
      userId,
    })
    .returning();

  const [user] = await db
    .select({ username: users.name })
    .from(users)
    .where(eq(users.id, row.userId));

  const [feed] = await db
    .select({ feedname: feeds.name })
    .from(feeds)
    .where(eq(feeds.id, row.feedId));

  return { ...row, username: user.username, feedname: feed.feedname };
}

export async function getFeedFollowsForUser(userId: string) {
  return db
    .select({
      feedname: feeds.name,
      username: users.name,
      feedId: feeds.id,
      userId: users.id,
    })
    .from(feed_follows)
    .where(eq(feed_follows.userId, userId))
    .innerJoin(users, eq(users.id, feed_follows.userId))
    .innerJoin(feeds, eq(feeds.id, feed_follows.feedId));
}

export async function unfollowFeed(feedId: string, userId: string) {
  return db
    .delete(feed_follows)
    .where(
      and(eq(feed_follows.userId, userId), eq(feed_follows.feedId, feedId)),
    )
    .returning();
}

export async function resetFeedFollows() {
  return db.delete(feed_follows);
}
