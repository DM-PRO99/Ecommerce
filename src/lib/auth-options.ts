import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

import dbConnect from '@/db/connect';
import User from '@/models/User';
import { sendLoginNotificationEmail } from '@/lib/email';

// No necesitamos importar dbConnect aquí ya que usamos el adaptador de MongoDB

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user']
  }
}

const client = new MongoClient(process.env.MONGODB_URI as string);
const clientPromise = client.connect();

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not defined in environment variables');
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_DB,
  }) as any,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 587),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email o usuario', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        const rawIdentifier = credentials?.email?.trim();
        const password = credentials?.password;

        if (!rawIdentifier || !password) {
          throw new Error('Missing credentials');
        }

        const emailIdentifier = rawIdentifier.toLowerCase();

        // Permitir login tanto por email como por nombre de usuario
        const user = await User.findOne({
          $or: [
            { email: emailIdentifier },
            { name: rawIdentifier },
          ],
        }).select('+password');
        
        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      try {
        if (!user?.email) return;

        const userAgent = (profile as any)?.userAgent ?? undefined;

        await sendLoginNotificationEmail({
          to: user.email,
          name: user.name,
          userAgent,
        });
      } catch (error) {
        console.error('Error sending login notification email:', error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export default authOptions;
