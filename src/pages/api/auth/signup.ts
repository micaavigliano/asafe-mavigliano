import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/app/helpers/db';
import { hashPassword } from '@/app/helpers/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({ message: 'Invalid input - password must be at least 7 characters long.' });
    return;
  }

  let client;

  try {
    client = await connectToDB();
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: 'User already exists' });
      return;
    }

    const hashedPass = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPass
    });

    res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      client.close();
    }
  }
}

export default handler;
