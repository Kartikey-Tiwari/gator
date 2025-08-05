import { resetFeeds } from "../lib/db/queries/feed.js";
import { resetUsers } from "../lib/db/queries/users.js";
import { resetFeedFollows } from "../lib/db/queries/feed_follows.js";

export async function handlerReset(_: string) {
  await resetUsers();
  await resetFeeds();
  await resetFeedFollows();
  console.log("Database reset successfully");
}
