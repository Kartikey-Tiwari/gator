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

function initRegistry(): CommandsRegistry {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
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
