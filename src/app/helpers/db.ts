import { MongoClient } from "mongodb";

export async function connectToDB() {
  const client = await MongoClient.connect(`mongodb+srv://mica:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.upukghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  return client;
}