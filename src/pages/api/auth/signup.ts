import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/app/helpers/db';
import { hashPassword } from '@/app/helpers/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data

    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      res.status(422).json({ message: 'blabla' });
      return;
    }

    const client = await connectToDB();
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email: email });

    if(existingUser) {
      res.status(422).json({ message: 'User already taken' });
      client.close();
      return;
    }

    const hashedPass = await hashPassword(password);

    const result = db.collection('users').insertOne({
      email: email,
      password: hashedPass
    });
    
    res.status(202).json({ message: 'created user' });
    client.close()
  }
}

export default handler;