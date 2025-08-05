import { createFeedFollow } from "../lib/db/queries/feed_follows.js";
import { createFeed, getFeeds } from "../lib/db/queries/feed.js";
import { Feed, User } from "../lib/db/schema.js";

export async function handlerAddFeed(_: string, user: User, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error("usage: addFeed <name> <url>");
  }

  const feed = await createFeed(args[0], args[1], user.id);
  await createFeedFollow(feed.id, user.id);
  printFeed(feed, user);
}

export function printFeed(feed: Feed, user: User) {
  console.log("Feed name:", feed.name);
  console.log("Feed url:", feed.url);
  console.log("Feed user:", user.name);
}

export async function handlerFeeds(_: string) {
  const feeds = await getFeeds();

  for (const feed of feeds) {
    console.log(`* Name: ${feed.name}`);
    console.log(`* URL: ${feed.url}`);
    console.log(`* Username: ${feed.username}`);
    console.log();
  }
}
