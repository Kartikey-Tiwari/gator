import { getUserByName } from "../lib/db/queries/users.js";
import { UserCommandHandler } from "./middlewares.js";
import { readConfig } from "../config.js";
import { CommandHandler } from "../commands/commands.js";

async function checkLoggedIn() {
  const username = readConfig().currentUserName;
  const user = await getUserByName(username);
  if (!user) {
    throw new Error(`User ${username} not found`);
  }
  return user;
}

export function middlewareLoggedIn(
  handler: UserCommandHandler,
): CommandHandler {
  async function newHandler(cmdName: string, ...args: string[]) {
    const user = await checkLoggedIn();
    await handler(cmdName, user, ...args);
  }
  return newHandler;
}
