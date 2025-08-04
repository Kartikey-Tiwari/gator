import { db } from "../index.js";
import { users } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function resetUsers() {
  return db.delete(users);
}

export async function getUsers() {
  let usersList = await db.select({ name: users.name }).from(users);
  return usersList.map((user) => user.name);
}
