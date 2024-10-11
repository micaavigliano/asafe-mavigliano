import { MongoClient } from "mongodb";

export async function connectToDB() {
  console.log(process.env.NEXT_DB_PASSWORD)
  const client = await MongoClient.connect(`mongodb+srv://mica:${process.env.NEXT_DB_PASSWORD}@cluster0.upukghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  return client;
}