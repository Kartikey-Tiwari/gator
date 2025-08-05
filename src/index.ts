import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands.js";
import {
  handlerLogin,
  handlerRegister,
  handlerUsers,
} from "./commands/users.js";
import { handlerReset } from "./commands/reset.js";
import { handlerAgg } from "./commands/agg.js";
import { handlerAddFeed, handlerFeeds } from "./commands/feed.js";
import { middlewareLoggedIn } from "./middlewares/loggedIn.js";
import {
  handlerFollow,
  handlerUnfollow,
  handlerFollowing,
} from "./commands/feed_follows.js";

function initRegistry(): CommandsRegistry {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));

  return registry;
}

async function main() {
  const registry = initRegistry();
  const args = process.argv.slice(2);
  if (args.length === 0) {
    process.exit(1);
  }
  const command = args[0];
  const options = args.slice(1);
  await runCommand(registry, command, ...options);
  process.exit(0);
}

await main();
