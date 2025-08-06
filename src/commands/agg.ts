import { createPost, getPostByURL } from "src/lib/db/queries/posts.js";
import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feed.js";
import { fetchFeed } from "../rss/fetchFeed.js";

export async function handlerAgg(_: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("usage: agg <time_between_reqs>");
  }

  const duration = parseDuration(args[0]);
  console.log(`Collecting feeds every ${args[0]}`);

  const id = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, duration);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("\nShutting down feed aggregator...");
      clearInterval(id);
      resolve();
    });
  });
}

function handleError(e: Error) {
  console.log(e.message);
}

function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);

  if (!match) {
    throw new Error("duration should be 1s, 1m, 1h, etc.");
  }

  const val = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "ms":
      return val;
    case "s":
      return val * 1000;
    case "m":
      return val * 60 * 1000;
    case "h":
      return val * 60 * 60 * 1000;
    default:
      return val;
  }
}

async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();
  if (!feed) {
    throw new Error("Could not get next feed to fetch");
  }

  const markedFeed = await markFeedFetched(feed.id);
  if (!markedFeed) {
    throw new Error("Could not mark next feed as fetched");
  }

  const rssFeed = await fetchFeed(markedFeed.url);
  if (!rssFeed) {
    throw new Error("Could not fetch feed " + markedFeed.url + "!");
  }

  const posts = rssFeed?.channel?.item;
  if (!Array.isArray(posts)) {
    console.log(`No posts found for ${markedFeed.url}`);
    return;
  }

  for (const post of posts) {
    const { title, link: url, description, pubDate: publishedAt } = post;
    const existingPost = await getPostByURL(url);
    if (!existingPost)
      createPost(title, url, description, new Date(publishedAt), markedFeed.id);
  }
  console.log(`Successfully fetched posts from ${feed.url}`);
}
