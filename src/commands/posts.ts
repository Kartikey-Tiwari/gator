import { getPostsForUser } from "src/lib/db/queries/posts";
import { User } from "src/lib/db/schema";

export async function handleBrowse(_: string, user: User, ...args: string[]) {
  if (args.length > 1) {
    throw new Error("usage: browse <limit>");
  }

  const limit = args.length === 0 ? 2 : parseInt(args[0]);

  const posts = await getPostsForUser(user.id, limit);

  for (const post of posts) {
    console.log(` * Title: ${post.title}`);
    console.log(` * URL: ${post.url}`);
    if (post.publishedAt) {
      console.log(` * Published Date: ${post.publishedAt}`);
    }
    console.log("Description:");
    console.log(post.description);
    console.log("-----------------------\n");
  }
}
