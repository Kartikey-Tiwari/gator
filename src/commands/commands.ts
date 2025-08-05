export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export type CommandsRegistry = {
  [key: string]: CommandHandler;
};

export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  if (!registry[cmdName]) {
    console.log("Command does not exist!");
    return;
  }
  await registry[cmdName](cmdName, ...args);
}
