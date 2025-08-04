import { readConfig } from "../config";
import { createFeed, getFeeds } from "../lib/db/queries/feed";
import { getUserByName } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";

export async function handlerAddFeed(_: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error("usage: addFeed <name> <url>");
  }

  const currentUserName = readConfig().currentUserName;
  const currentUser = await getUserByName(currentUserName);

  const feed = await createFeed(args[0], args[1], currentUser.id);
  printFeed(feed, currentUser);
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
