import { fetchFeed } from "../rss/fetchFeed.js";

export async function handlerAgg() {
  const rssFeed = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(JSON.stringify(rssFeed));
}
