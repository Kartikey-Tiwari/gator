import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  const res = await fetch(feedURL, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
    },
  });
  const responseText = await res.text();
  const parser = new XMLParser();
  const data = parser.parse(responseText);

  if (!data.rss.channel) {
    throw new Error("given feed url is not an rss feed");
  }

  const channel = data.rss.channel;
  const { title, description, link } = channel;
  if (
    !title ||
    typeof title !== "string" ||
    !description ||
    typeof description !== "string" ||
    !link ||
    typeof description !== "string"
  ) {
    throw new Error("Invaid metadata of rss feed");
  }
  const rssFeed: RSSFeed = {
    channel: {
      title,
      description,
      link,
      item: [],
    },
  };
  if (Array.isArray(channel.item)) {
    for (const el of channel.item) {
      const { title, link, description, pubDate } = el;
      if (title && link && description && pubDate) {
        const rssItem: RSSItem = {
          title,
          link,
          description,
          pubDate,
        };
        rssFeed.channel.item.push(rssItem);
      }
    }
  }

  return rssFeed;
}
