import { verifyPass } from '@/app/helpers/auth';
import { WithId } from 'mongodb';
import { connectToDB } from '@/app/helpers/db';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  email: string;
  password?: string;
}

export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const client = connectToDB();
        const usersCollections = (await client).db().collection<User>('users');
        const user: WithId<User> | null = await usersCollections.findOne({ email: credentials?.email })

        if (user) {
          const isValid = verifyPass(credentials?.password!, user?.password!);

          if (!isValid) {
            throw new Error('Could not log in!');
          }
          
          return user
        }

        return null
      }
    })
  ]
});