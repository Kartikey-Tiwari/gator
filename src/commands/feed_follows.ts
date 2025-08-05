import { getFeedByURL } from "../lib/db/queries/feed.js";
import { User } from "../lib/db/schema.js";
import { unfollowFeed } from "../lib/db/queries/feed_follows.js";
import { createFeedFollow } from "../lib/db/queries/feed_follows.js";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follows.js";

export async function handlerFollow(_: string, user: User, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("usage: follow <url>");
  }

  const feed = await getFeedByURL(args[0]);
  if (feed === undefined) {
    console.log("The feed doesn't exist");
    return;
  }
  const feedFollow = await createFeedFollow(feed.id, user.id);

  console.log(
    `RSS Feed "${feedFollow.feedname}" has been followed by ${feedFollow.username}`,
  );
}

export async function handlerUnfollow(
  _: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error("usage: unfollow <url>");
  }
  const feed = await getFeedByURL(args[0]);
  if (feed === undefined) {
    console.log("The feed doesn't exist");
    return;
  }

  const [res] = await unfollowFeed(feed.id, user.id);
  if (res !== undefined) {
    console.log(`Unfollowed the feed at the url ${feed.url}`);
  } else {
    console.log(`The user doesn't follow ${feed.url}`);
  }
}

export async function handlerFollowing(_: string, user: User) {
  const following = await getFeedFollowsForUser(user.id);
  if (following.length === 0) {
    console.log(`User ${user.name} does not follow any feeds.`);
    return;
  }

  console.log(`Feeds followed by user ${user.name}:`);
  for (const feed of following) {
    console.log(` * ${feed.feedname}`);
  }
}
