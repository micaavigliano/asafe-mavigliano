import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from '../../../app/helpers/db';
import { verifyPass } from '../../../app/helpers/auth';
import { WithId } from 'mongodb';
interface User {
  id: string;
  email: string;
  password: string;
}

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 180
  },
  pages: {
    signIn: '/auth',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Invalid credentials');
        }
        const client = await connectToDB();
        const usersCollections = client.db().collection<User>('users');

        const user: WithId<User> | null = await usersCollections.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('No user found or invalid password');
        }

        const isValid = await verifyPass(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Could not log in - invalid credentials');
        }
        return {
          id: user.id,
          email: user.email,
        };
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || ''
});
