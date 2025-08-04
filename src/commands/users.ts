import { readConfig, setUser } from "../config.js";
import {
  createUser,
  getUserByName,
  getUsers,
} from "../lib/db/queries/users.js";

export async function handlerLogin(_: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("usage: login <username>");
  }

  const existingUser = await getUserByName(args[0]);
  if (!existingUser) {
    throw new Error("Username doesn't exist");
  }
  setUser(args[0]);
  console.log(`${args[0]} has been set as the current username`);
}

export async function handlerRegister(_: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("usage: register <username>");
  }
  const name = args[0];
  const existingUser = await getUserByName(name);
  if (!existingUser) {
    const user = await createUser(name);
    setUser(user.name);
    console.log("The user was created successfully!");
    console.log({ user });
  } else {
    throw new Error("username already exists!");
  }
}

export async function handlerUsers(_: string) {
  const usersList = await getUsers();
  const currentUser = readConfig().currentUserName;

  for (const user of usersList) {
    console.log(`* ${user}${user === currentUser ? " (current)" : ""}`);
  }
}
