import { resetUsers } from "../lib/db/queries/users.js";

export async function handlerReset(_: string) {
  await resetUsers();
  console.log("Database reset successfully");
}
