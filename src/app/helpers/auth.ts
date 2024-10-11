import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashPass = hash(password, 12);

  return hashPass;
}

export async function verifyPass(password: string, hashedPass: string) {
  return await compare(password, hashedPass)
}