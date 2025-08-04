import { fetchFeed } from "src/rss/fetchFeed";

export async function handlerAgg() {
  const rssFeed = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(JSON.stringify(rssFeed));
}
