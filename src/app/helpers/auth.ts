import { hash } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashPass = hash(password, 12);

  return hashPass;
}